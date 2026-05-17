import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Request, Notification } from "@shared/schema";
import {
  Car,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Bell,
  MapPin,
  Calendar,
  ArrowRight,
  RefreshCw,
  Camera,
  User,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock },
  checking: { label: "Checking", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Eye },
  found: { label: "Found", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  not_found: { label: "Not Found", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
};

export default function DriverDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: requests, isLoading: requestsLoading, refetch: refetchRequests } = useQuery<Request[]>({
    queryKey: ["/api/requests/driver"],
    enabled: !!user,
  });

  const { data: notifications, isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ["/api/notifications", user?.id],
    enabled: !!user,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/requests/${requestId}`, {
        status,
        driverId: user?.id,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests/driver"] });
      toast({
        title: "Status Updated",
        description: "Request status has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status.",
        variant: "destructive",
      });
    },
  });

  const unreadCount = notifications?.filter((n) => !n.seen).length || 0;

  const handleStatusUpdate = (requestId: string, status: string) => {
    updateStatusMutation.mutate({ requestId, status });
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white/20 text-white border-white/30">Driver</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome, {user?.name || "Driver"}
              </h1>
              <p className="text-purple-100">Help passengers find their lost items</p>
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
              <Link href="/driver/found-items">
                <Button className="bg-white text-purple-600 hover:bg-purple-50" data-testid="button-found-items">
                  <Camera className="w-4 h-4 mr-2" />
                  My Found Items
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
                <Car className="w-5 h-5 text-purple-500" />
                Incoming Lost Item Requests
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
                  const isPending = request.status === "pending";
                  const isChecking = request.status === "checking";

                  return (
                    <Card key={request.id} className="hover:shadow-lg transition-shadow" data-testid={`request-card-${request.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
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

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 mb-4">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Lost Item Description:</p>
                          <p className="text-slate-700 dark:text-slate-300">{request.itemDescription}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                          {(isPending || isChecking) && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleStatusUpdate(request.id, "found")}
                                disabled={updateStatusMutation.isPending}
                                data-testid="button-mark-found"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark as Found
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                                onClick={() => handleStatusUpdate(request.id, "not_found")}
                                disabled={updateStatusMutation.isPending}
                                data-testid="button-mark-not-found"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Not Found
                              </Button>
                              {isPending && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(request.id, "checking")}
                                  disabled={updateStatusMutation.isPending}
                                  data-testid="button-mark-checking"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Checking
                                </Button>
                              )}
                            </>
                          )}
                          {request.status === "found" && (
                            <Link href={`/driver/upload-item/${request.id}`}>
                              <Button size="sm" className="bg-purple-500 hover:bg-purple-600" data-testid="button-upload-photo">
                                <Camera className="w-4 h-4 mr-1" />
                                Upload Photo
                              </Button>
                            </Link>
                          )}
                          <Link href={`/chat/${request.id}`}>
                            <Button size="sm" variant="outline" data-testid="button-chat">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                          </Link>
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
                    <Car className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No requests yet</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    You'll receive notifications when passengers report lost items on your routes.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-500" />
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
                            : "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800"
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
                <Link href="/driver/found-items" className="block">
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-found-items">
                    <Camera className="w-4 h-4 mr-2" />
                    My Found Items
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
