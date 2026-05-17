import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message, Request } from "@shared/schema";
import {
  ArrowLeft,
  Send,
  Car,
  MapPin,
  Calendar,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle,
  Eye,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock },
  checking: { label: "Checking", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Eye },
  found: { label: "Found", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
};

interface ChatData {
  request: Request;
  messages: Message[];
  otherUser: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };
  contactRevealed: boolean;
}

export default function Chat() {
  const { requestId } = useParams<{ requestId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chatData, isLoading, refetch } = useQuery<ChatData>({
    queryKey: ["/api/chat", requestId],
    enabled: !!requestId && !!user,
    refetchInterval: 3000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!requestId || !user || !chatData) throw new Error("Missing data");

      const data = {
        requestId,
        senderId: user.id,
        receiverId: chatData.otherUser.id,
        message,
      };

      const response = await apiRequest("POST", "/api/messages", data);
      return response.json();
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/chat", requestId] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send",
        description: error.message || "Could not send message.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage.trim());
    }
  };

  const dashboardLink = user?.role === "driver" ? "/driver-dashboard" : "/passenger-dashboard";

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  if (!chatData) {
    return (
      <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Chat not found or you don't have access.</p>
            <Link href={dashboardLink}>
              <Button>Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = statusConfig[chatData.request.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <div className="sticky top-16 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/conversations">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {chatData.otherUser.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900 dark:text-white truncate">
                {chatData.otherUser.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Car className="w-4 h-4" />
                <span className="truncate">{chatData.request.vehicleNumber}</span>
              </div>
            </div>

            <Badge className={status.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatData.messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-slate-500 dark:text-slate-400 text-center">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                ) : (
                  chatData.messages.map((message) => {
                    const isOwnMessage = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                        data-testid={`message-${message.id}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isOwnMessage
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${isOwnMessage ? "text-white/70" : "text-slate-500 dark:text-slate-400"}`}>
                            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Now"}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sendMessageMutation.isPending}
                    data-testid="input-message"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                    disabled={!newMessage.trim() || sendMessageMutation.isPending}
                    data-testid="button-send"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  {user?.role === "driver" ? "Passenger" : "Driver"} Info
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                    {chatData.otherUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{chatData.otherUser.name}</p>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {user?.role === "driver" ? "Passenger" : "Driver"}
                    </Badge>
                  </div>
                </div>

                {chatData.contactRevealed ? (
                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    {chatData.otherUser.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-300">{chatData.otherUser.email}</span>
                      </div>
                    )}
                    {chatData.otherUser.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-300">{chatData.otherUser.phone}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-sm text-amber-700 dark:text-amber-300">
                    Contact details will be revealed when the item is marked as found and the driver enables contact sharing.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Car className="w-4 h-4 text-purple-500" />
                  Trip Details
                </h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-400">From:</span>
                  <span className="text-slate-900 dark:text-white">{chatData.request.fromLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-slate-600 dark:text-slate-400">To:</span>
                  <span className="text-slate-900 dark:text-white">{chatData.request.toLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-400">Date:</span>
                  <span className="text-slate-900 dark:text-white">{chatData.request.travelDate}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Lost Item:</p>
                  <p className="text-slate-900 dark:text-white">{chatData.request.itemDescription}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
