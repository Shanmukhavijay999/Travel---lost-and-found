import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { Request, Notification } from "@shared/schema";
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Bell,
  Plus,
  MapPin,
  Calendar,
  Car,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock },
  checking: { label: "Checking", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Eye },
  found: { label: "Found", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  not_found: { label: "Not Found", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
};

export default function PassengerDashboard() {
  const { user } = useAuth();

  const { data: requests, isLoading: requestsLoading, refetch: refetchRequests } = useQuery<Request[]>({
    queryKey: ["/api/requests", user?.id],
    enabled: !!user,
  });

  const { data: notifications, isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ["/api/notifications", user?.id],
    enabled: !!user,
  });

  const unreadCount = notifications?.filter((n) => !n.seen).length || 0;

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome, {user?.name || "Passenger"}
              </h1>
              <p className="text-blue-100">Track your lost item requests and notifications</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20"
                onClick={() => refetchRequests()}
                data-testid="button-refresh"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Link href="/categories">
                <Button className="bg-white text-blue-600 hover:bg-blue-50" data-testid="button-new-request">
                  <Plus className="w-4 h-4 mr-2" />
                  Report Lost Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" />
                My Lost Item Requests
              </h2>
              <Badge variant="secondary">{requests?.length || 0} requests</Badge>
            </div>

            {requestsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-48 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : requests && requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => {
                  const status = statusConfig[request.status] || statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <Card key={request.id} className="hover:shadow-lg transition-shadow" data-testid={`request-card-${request.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <Car className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white capitalize">
                                {request.modeOfTransport} - {request.vehicleNumber}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Request ID: {request.id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                          <Badge className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-green-500" />
                            {request.fromLocation}
                          </div>
                          <ArrowRight className="w-4 h-4" />
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-red-500" />
                            {request.toLocation}
                          </div>
                          <div className="flex items-center gap-1 ml-auto">
                            <Calendar className="w-4 h-4" />
                            {request.travelDate}
                          </div>
                        </div>

                        <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
                          {request.itemDescription}
                        </p>

                        <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                          {request.status === "found" && (
                            <Link href={`/found-item/${request.id}`}>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600" data-testid="button-view-found">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                View Found Item
                              </Button>
                            </Link>
                          )}
                          {request.driverId && (
                            <Link href={`/chat/${request.id}`}>
                              <Button size="sm" variant="outline" data-testid="button-chat">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Chat with Driver
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No requests yet</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    You haven't reported any lost items. Start by reporting your first lost item.
                  </p>
                  <Link href="/categories">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600" data-testid="button-first-request">
                      <Plus className="w-4 h-4 mr-2" />
                      Report Lost Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-500" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white ml-auto">{unreadCount}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notificationsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : notifications && notifications.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.seen
                            ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            : "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                        }`}
                        data-testid={`notification-${notification.id}`}
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-300">{notification.message}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : "Just now"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No notifications yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/conversations" className="block">
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-conversations">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Conversations
                  </Button>
                </Link>
                <Link href="/categories" className="block">
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-new-report">
                    <Plus className="w-4 h-4 mr-2" />
                    New Lost Item Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
