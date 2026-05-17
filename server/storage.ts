import {
  type User,
  type InsertUser,
  type Request,
  type InsertRequest,
  type FoundItem,
  type InsertFoundItem,
  type Message,
  type InsertMessage,
  type Notification,
  type InsertNotification,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getRequests(): Promise<Request[]>;
  getRequestsByUserId(userId: string): Promise<Request[]>;
  getRequestsForDriver(): Promise<Request[]>;
  getRequest(id: string): Promise<Request | undefined>;
  createRequest(request: InsertRequest): Promise<Request>;
  updateRequest(id: string, updates: Partial<Request>): Promise<Request | undefined>;
  
  getFoundItems(): Promise<FoundItem[]>;
  getFoundItemsByDriverId(driverId: string): Promise<FoundItem[]>;
  getFoundItemByRequestId(requestId: string): Promise<FoundItem | undefined>;
  createFoundItem(foundItem: InsertFoundItem): Promise<FoundItem>;
  
  getMessages(requestId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationSeen(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private requests: Map<string, Request>;
  private foundItems: Map<string, FoundItem>;
  private messages: Map<string, Message>;
  private notifications: Map<string, Notification>;

  constructor() {
    this.users = new Map();
    this.requests = new Map();
    this.foundItems = new Map();
    this.messages = new Map();
    this.notifications = new Map();
    
    this.seedData();
  }

  private seedData() {
    const driverId = randomUUID();
    const passengerId = randomUUID();
    
    const driver: User = {
      id: driverId,
      name: "Rajesh Kumar",
      email: "rajesh@driver.com",
      password: "$2b$10$demo",
      role: "driver",
      phone: "+91 98765 43210",
      createdAt: new Date(),
    };
    
    const passenger: User = {
      id: passengerId,
      name: "Priya Sharma",
      email: "priya@passenger.com",
      password: "$2b$10$demo",
      role: "passenger",
      phone: "+91 87654 32109",
      createdAt: new Date(),
    };
    
    this.users.set(driverId, driver);
    this.users.set(passengerId, passenger);
    
    const requestId = randomUUID();
    const request: Request = {
      id: requestId,
      userId: passengerId,
      driverId: null,
      modeOfTransport: "bus",
      fromLocation: "Bangalore",
      toLocation: "Chennai",
      vehicleNumber: "KA-05 AB 1234",
      travelDate: "2024-12-10",
      travelTime: "14:30",
      seatNumber: "12A",
      itemDescription: "Black leather laptop bag with MacBook Pro inside. Has a blue keychain attached.",
      status: "pending",
      createdAt: new Date(),
    };
    
    this.requests.set(requestId, request);
    
    const notificationId = randomUUID();
    const notification: Notification = {
      id: notificationId,
      userId: driverId,
      type: "new_request",
      message: "New lost item request: Black leather laptop bag on Bus KA-05 AB 1234",
      seen: false,
      createdAt: new Date(),
    };
    
    this.notifications.set(notificationId, notification);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getRequests(): Promise<Request[]> {
    return Array.from(this.requests.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getRequestsByUserId(userId: string): Promise<Request[]> {
    return Array.from(this.requests.values())
      .filter((request) => request.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getRequestsForDriver(): Promise<Request[]> {
    return Array.from(this.requests.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getRequest(id: string): Promise<Request | undefined> {
    return this.requests.get(id);
  }

  async createRequest(insertRequest: InsertRequest): Promise<Request> {
    const id = randomUUID();
    const request: Request = {
      ...insertRequest,
      id,
      createdAt: new Date(),
    };
    this.requests.set(id, request);
    return request;
  }

  async updateRequest(id: string, updates: Partial<Request>): Promise<Request | undefined> {
    const request = this.requests.get(id);
    if (!request) return undefined;
    
    const updated = { ...request, ...updates };
    this.requests.set(id, updated);
    return updated;
  }

  async getFoundItems(): Promise<FoundItem[]> {
    return Array.from(this.foundItems.values());
  }

  async getFoundItemsByDriverId(driverId: string): Promise<FoundItem[]> {
    return Array.from(this.foundItems.values())
      .filter((item) => item.driverId === driverId)
      .sort((a, b) => new Date(b.foundTime || 0).getTime() - new Date(a.foundTime || 0).getTime());
  }

  async getFoundItemByRequestId(requestId: string): Promise<FoundItem | undefined> {
    return Array.from(this.foundItems.values()).find((item) => item.requestId === requestId);
  }

  async createFoundItem(insertFoundItem: InsertFoundItem): Promise<FoundItem> {
    const id = randomUUID();
    const foundItem: FoundItem = {
      ...insertFoundItem,
      id,
      foundTime: new Date(),
    };
    this.foundItems.set(id, foundItem);
    return foundItem;
  }

  async getMessages(requestId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.requestId === requestId)
      .sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      id,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationSeen(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.seen = true;
      this.notifications.set(id, notification);
    }
  }
}

export const storage = new MemStorage();
