import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import {
  Car,
  Clock,
  Hash,
  FileText,
  ArrowRight,
  ArrowLeft,
  Send,
  Bus,
  Train,
  Bike,
  MapPin,
  Calendar,
  AlertCircle,
} from "lucide-react";

const transportIcons: Record<string, typeof Bus> = {
  bus: Bus,
  train: Train,
  auto: Bike,
  cab: Car,
  metro: Train,
};

const transportLabels: Record<string, string> = {
  bus: "Bus",
  train: "Train",
  auto: "Auto Rickshaw",
  cab: "Cab / Taxi",
  metro: "Metro",
};

interface TripDetails {
  transport: string;
  fromLocation: string;
  toLocation: string;
  travelDate: string;
}

export default function VehicleSearch() {
  const [, setLocationPath] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  const form = useForm({
    defaultValues: {
      vehicleNumber: "",
      travelTime: "",
      seatNumber: "",
      itemDescription: "",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("tripDetails");
    if (stored) {
      try {
        setTripDetails(JSON.parse(stored));
      } catch {
        setLocationPath("/categories");
      }
    } else {
      setLocationPath("/categories");
    }
  }, [setLocationPath]);

  const submitMutation = useMutation({
    mutationFn: async (data: {
      vehicleNumber: string;
      travelTime: string;
      seatNumber: string;
      itemDescription: string;
    }) => {
      if (!tripDetails || !user) throw new Error("Missing data");
      
      const requestData = {
        userId: user.id,
        modeOfTransport: tripDetails.transport,
        fromLocation: tripDetails.fromLocation,
        toLocation: tripDetails.toLocation,
        vehicleNumber: data.vehicleNumber,
        travelDate: tripDetails.travelDate,
        travelTime: data.travelTime || null,
        seatNumber: data.seatNumber || null,
        itemDescription: data.itemDescription,
        status: "pending",
      };

      const response = await apiRequest("POST", "/api/requests", requestData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "Your lost item report has been sent to drivers on this route.",
      });
      localStorage.removeItem("selectedTransport");
      localStorage.removeItem("tripDetails");
      setLocationPath("/passenger-dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: {
    vehicleNumber: string;
    travelTime: string;
    seatNumber: string;
    itemDescription: string;
  }) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a lost item request.",
        variant: "destructive",
      });
      setLocationPath("/login");
      return;
    }
    submitMutation.mutate(data);
  };

  if (!tripDetails) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const TransportIcon = transportIcons[tripDetails.transport] || Bus;
  const transportLabel = transportLabels[tripDetails.transport] || "Transport";

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Step 3 of 3</Badge>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm flex items-center gap-1">
              <TransportIcon className="w-4 h-4" />
              {transportLabel}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Vehicle & Item Details
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Enter vehicle information and describe your lost item. Be as specific as possible.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{tripDetails.fromLocation}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="font-medium">{tripDetails.toLocation}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{tripDetails.travelDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                Vehicle & Item Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="vehicleNumber"
                        placeholder="e.g., KA-05 AB 1234"
                        className="pl-10"
                        {...form.register("vehicleNumber", { required: true })}
                        data-testid="input-vehicle-number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelTime">Time of Travel (Optional)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="travelTime"
                        type="time"
                        className="pl-10"
                        {...form.register("travelTime")}
                        data-testid="input-travel-time"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seatNumber">Seat Number (Optional)</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="seatNumber"
                      placeholder="e.g., 23A, Window seat"
                      className="pl-10"
                      {...form.register("seatNumber")}
                      data-testid="input-seat-number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemDescription">Item Description *</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Textarea
                      id="itemDescription"
                      placeholder="Describe your lost item in detail - color, brand, contents, any identifying marks..."
                      className="pl-10 min-h-[120px]"
                      {...form.register("itemDescription", { required: true })}
                      data-testid="input-item-description"
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tip: Include brand, color, size, and any unique identifying features.
                  </p>
                </div>

                {!isAuthenticated && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Login Required</p>
                      <p className="text-sm text-amber-600 dark:text-amber-300">
                        You need to{" "}
                        <Link href="/login" className="underline font-medium">
                          log in
                        </Link>{" "}
                        or{" "}
                        <Link href="/signup" className="underline font-medium">
                          sign up
                        </Link>{" "}
                        to submit a lost item request.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Link href="/location">
                    <Button variant="outline" className="gap-2" data-testid="button-back">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    disabled={submitMutation.isPending || !form.watch("vehicleNumber") || !form.watch("itemDescription")}
                    data-testid="button-submit"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
