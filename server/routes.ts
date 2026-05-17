import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRequestSchema, insertMessageSchema, insertFoundItemSchema, insertNotificationSchema, signupSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = signupSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const user = await storage.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone || null,
      });
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      if (user.password !== data.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/requests", async (req, res) => {
    try {
      const requests = await storage.getRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/requests/:userId", async (req, res) => {
    try {
      if (req.params.userId === "driver") {
        const requests = await storage.getRequestsForDriver();
        return res.json(requests);
      }
      const requests = await storage.getRequestsByUserId(req.params.userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/request/:id", async (req, res) => {
    try {
      const request = await storage.getRequest(req.params.id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/requests", async (req, res) => {
    try {
      const data = insertRequestSchema.parse(req.body);
      const request = await storage.createRequest(data);
      
      await storage.createNotification({
        userId: "all_drivers",
        type: "new_request",
        message: `New lost item request: ${data.itemDescription.slice(0, 50)}...`,
        seen: false,
      });
      
      res.json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/requests/:id", async (req, res) => {
    try {
      const updates = req.body;
      const request = await storage.updateRequest(req.params.id, updates);
      
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      
      if (updates.status === "found" && request.userId) {
        await storage.createNotification({
          userId: request.userId,
          type: "item_found",
          message: `Great news! Your item has been found by a driver.`,
          seen: false,
        });
      }
      
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/found-items/driver/:driverId", async (req, res) => {
    try {
      const items = await storage.getFoundItemsByDriverId(req.params.driverId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/found-items/:requestId", async (req, res) => {
    try {
      const foundItem = await storage.getFoundItemByRequestId(req.params.requestId);
      if (!foundItem) {
        return res.status(404).json({ message: "Found item not found" });
      }
      
      const request = await storage.getRequest(foundItem.requestId);
      const driver = await storage.getUser(foundItem.driverId);
      
      if (!request || !driver) {
        return res.status(404).json({ message: "Related data not found" });
      }
      
      const { password: _, ...driverWithoutPassword } = driver;
      
      res.json({
        foundItem,
        request,
        driver: {
          ...driverWithoutPassword,
          email: foundItem.contactReveal ? driver.email : undefined,
          phone: foundItem.contactReveal ? driver.phone : undefined,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/found-items", async (req, res) => {
    try {
      const data = insertFoundItemSchema.parse(req.body);
      const foundItem = await storage.createFoundItem(data);
      
      const request = await storage.getRequest(data.requestId);
      if (request) {
        await storage.updateRequest(data.requestId, { status: "found", driverId: data.driverId });
        
        await storage.createNotification({
          userId: request.userId,
          type: "item_found",
          message: `Your lost item has been found! Check the details and chat with the driver.`,
          seen: false,
        });
      }
      
      res.json(foundItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/messages/:requestId", async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.requestId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      
      await storage.createNotification({
        userId: data.receiverId,
        type: "new_message",
        message: `New message: ${data.message.slice(0, 30)}...`,
        seen: false,
      });
      
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const notifications = await storage.getNotifications(req.params.userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/notifications/:id/seen", async (req, res) => {
    try {
      await storage.markNotificationSeen(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/conversations/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const allRequests = await storage.getRequests();
      const conversations = [];
      
      for (const request of allRequests) {
        const hasConversation = (user.role === "passenger" && request.userId === userId) ||
                                (user.role === "driver" && request.driverId === userId);
        
        if (hasConversation && request.driverId) {
          const messages = await storage.getMessages(request.id);
          const lastMessage = messages[messages.length - 1];
          
          const otherUserId = user.role === "passenger" ? request.driverId : request.userId;
          const otherUser = await storage.getUser(otherUserId);
          
          if (otherUser) {
            conversations.push({
              request,
              lastMessage,
              unreadCount: 0,
              otherUserName: otherUser.name,
            });
          }
        }
      }
      
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/chat/:requestId", async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const userId = req.query.userId as string;
      
      const request = await storage.getRequest(requestId);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      
      const messages = await storage.getMessages(requestId);
      
      const currentUser = userId ? await storage.getUser(userId) : null;
      
      let otherUserId: string;
      if (currentUser?.role === "passenger") {
        otherUserId = request.driverId || "";
      } else {
        otherUserId = request.userId;
      }
      
      const otherUser = otherUserId ? await storage.getUser(otherUserId) : null;
      
      const foundItem = await storage.getFoundItemByRequestId(requestId);
      const contactRevealed = foundItem?.contactReveal || false;
      
      res.json({
        request,
        messages,
        otherUser: otherUser ? {
          id: otherUser.id,
          name: otherUser.name,
          email: contactRevealed ? otherUser.email : undefined,
          phone: contactRevealed ? otherUser.phone : undefined,
        } : { id: "", name: "Unknown User" },
        contactRevealed,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
