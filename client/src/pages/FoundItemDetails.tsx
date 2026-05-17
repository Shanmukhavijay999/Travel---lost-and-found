import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { FoundItem, Request } from "@shared/schema";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  Calendar,
  Car,
  Image,
  Phone,
  Mail,
  User,
  MessageSquare,
  Eye,
} from "lucide-react";

interface FoundItemData {
  foundItem: FoundItem;
  request: Request;
  driver: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };
}

export default function FoundItemDetails() {
  const { requestId } = useParams<{ requestId: string }>();
  const { user } = useAuth();

  const { data, isLoading } = useQuery<FoundItemData>({
    queryKey: ["/api/found-items", requestId],
    enabled: !!requestId && !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Found item not found or you don't have access.</p>
            <Link href="/passenger-dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { foundItem, request, driver } = data;

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/passenger-dashboard">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 -ml-2 mb-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Item Found!
            </h1>
          </div>
          <p className="text-green-100">Great news! A driver has found your item.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-green-500" />
                Found Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {foundItem.photoUrl ? (
                <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video">
                  <img
                    src={foundItem.photoUrl}
                    alt="Found item"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-500 dark:text-slate-400">No photo uploaded</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium text-slate-500 dark:text-slate-400 mb-2">Driver's Description</h3>
                <p className="text-slate-900 dark:text-white">{foundItem.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                Found on {foundItem.foundTime ? new Date(foundItem.foundTime).toLocaleDateString() : "Recently"}
              </div>

              <Link href={`/chat/${requestId}`}>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600" data-testid="button-chat">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Driver
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                    {driver.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{driver.name}</h3>
                    <Badge variant="secondary">Verified Driver</Badge>
                  </div>
                </div>

                {foundItem.contactReveal ? (
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Eye className="w-3 h-3 mr-1" />
                      Contact Revealed
                    </Badge>
                    {driver.email && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                          <p className="font-medium text-slate-900 dark:text-white">{driver.email}</p>
                        </div>
                      </div>
                    )}
                    {driver.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <Phone className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                          <p className="font-medium text-slate-900 dark:text-white">{driver.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      The driver hasn't revealed their contact details yet. Use the chat to arrange item handover.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-purple-500" />
                  Your Original Request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Transport</span>
                  <span className="font-medium text-slate-900 dark:text-white capitalize">{request.modeOfTransport}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Vehicle</span>
                  <span className="font-medium text-slate-900 dark:text-white">{request.vehicleNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Route</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {request.fromLocation} → {request.toLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Travel Date</span>
                  <span className="font-medium text-slate-900 dark:text-white">{request.travelDate}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400 mb-1">Your Description:</p>
                  <p className="text-slate-900 dark:text-white">{request.itemDescription}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
