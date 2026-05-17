import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { Request, Message } from "@shared/schema";
import {
  MessageSquare,
  ArrowLeft,
  Car,
  User,
  ArrowRight,
  Clock,
  CheckCircle,
  Eye,
} from "lucide-react";

interface ConversationThread {
  request: Request;
  lastMessage?: Message;
  unreadCount: number;
  otherUserName: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock },
  checking: { label: "Checking", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Eye },
  found: { label: "Found", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
};

export default function ConversationsCenter() {
  const { user } = useAuth();

  const { data: conversations, isLoading } = useQuery<ConversationThread[]>({
    queryKey: ["/api/conversations", user?.id],
    enabled: !!user,
  });

  const dashboardLink = user?.role === "driver" ? "/driver-dashboard" : "/passenger-dashboard";

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Link href={dashboardLink}>
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 -ml-2 mb-2" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Conversations Center
              </h1>
              <p className="text-indigo-100">Chat with {user?.role === "driver" ? "passengers" : "drivers"} about lost items</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {conversations?.length || 0} conversations
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : conversations && conversations.length > 0 ? (
          <div className="space-y-4">
            {conversations.map((thread) => {
              const status = statusConfig[thread.request.status] || statusConfig.pending;
              const StatusIcon = status.icon;

              return (
                <Link key={thread.request.id} href={`/chat/${thread.request.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01]" data-testid={`conversation-${thread.request.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {thread.otherUserName.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                              {thread.otherUserName}
                            </h3>
                            {thread.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs">{thread.unreadCount}</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                            <Car className="w-4 h-4" />
                            <span className="capitalize">{thread.request.modeOfTransport}</span>
                            <span className="text-slate-300 dark:text-slate-600">|</span>
                            <span>{thread.request.vehicleNumber}</span>
                          </div>

                          {thread.lastMessage && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                              {thread.lastMessage.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Badge className={`${status.color} text-xs`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          <ArrowRight className="w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No conversations yet</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {user?.role === "driver"
                  ? "Conversations will appear when you respond to lost item requests."
                  : "Conversations will appear when drivers respond to your lost item reports."}
              </p>
              <Link href={dashboardLink}>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600" data-testid="button-dashboard">
                  Go to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
