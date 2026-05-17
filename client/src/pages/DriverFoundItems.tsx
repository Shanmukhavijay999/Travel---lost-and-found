import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { FoundItem } from "@shared/schema";
import {
  Camera,
  ArrowLeft,
  MapPin,
  Calendar,
  Eye,
  MessageSquare,
  CheckCircle,
  Image,
  Plus,
} from "lucide-react";

export default function DriverFoundItems() {
  const { user } = useAuth();

  const { data: foundItems, isLoading } = useQuery<FoundItem[]>({
    queryKey: ["/api/found-items/driver", user?.id],
    enabled: !!user,
  });

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Link href="/driver-dashboard">
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 -ml-2 mb-2" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                My Found Items
              </h1>
              <p className="text-green-100">Items you've found and uploaded</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {foundItems?.length || 0} items
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
                  <div className="flex gap-4">
                    <Skeleton className="w-24 h-24 rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : foundItems && foundItems.length > 0 ? (
          <div className="space-y-4">
            {foundItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow" data-testid={`found-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {item.photoUrl ? (
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                        <img
                          src={item.photoUrl}
                          alt="Found item"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Image className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                            Request #{item.requestId.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Found on {item.foundTime ? new Date(item.foundTime).toLocaleDateString() : "Recently"}
                          </p>
                        </div>
                        <Badge className={item.contactReveal ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                          {item.contactReveal ? (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              Contact Visible
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Found
                            </>
                          )}
                        </Badge>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 mb-4">{item.description}</p>

                      <div className="flex items-center gap-2">
                        <Link href={`/chat/${item.requestId}`}>
                          <Button size="sm" variant="outline" data-testid="button-chat">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat with Passenger
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No found items yet</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                When you find a lost item and upload it, it will appear here.
              </p>
              <Link href="/driver-dashboard">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600" data-testid="button-view-requests">
                  View Incoming Requests
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
