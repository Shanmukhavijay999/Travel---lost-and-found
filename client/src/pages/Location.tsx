import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight, ArrowLeft, Bus, Train, Car, Bike } from "lucide-react";

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

const popularRoutes = [
  { from: "Bangalore", to: "Chennai" },
  { from: "Delhi", to: "Mumbai" },
  { from: "Hyderabad", to: "Bangalore" },
  { from: "Pune", to: "Mumbai" },
  { from: "Kolkata", to: "Delhi" },
];

export default function Location() {
  const [, setLocationPath] = useLocation();
  const [selectedTransport, setSelectedTransport] = useState<string>("bus");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("selectedTransport");
    if (stored) {
      setSelectedTransport(stored);
    }
  }, []);

  const handleContinue = () => {
    if (!fromLocation || !toLocation || !travelDate) return;
    
    localStorage.setItem("tripDetails", JSON.stringify({
      transport: selectedTransport,
      fromLocation,
      toLocation,
      travelDate,
    }));
    setLocationPath("/vehicle-search");
  };

  const handleQuickRoute = (route: { from: string; to: string }) => {
    setFromLocation(route.from);
    setToLocation(route.to);
  };

  const TransportIcon = transportIcons[selectedTransport] || Bus;
  const transportLabel = transportLabels[selectedTransport] || "Transport";

  const isFormValid = fromLocation && toLocation && travelDate;

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
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Step 2 of 3</Badge>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm flex items-center gap-1">
              <TransportIcon className="w-4 h-4" />
              {transportLabel}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Enter Journey Details
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Tell us about your journey. The more details you provide, the easier it is to find your item.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                Route Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    <Input
                      id="from"
                      placeholder="Enter departure city/station"
                      className="pl-10"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      data-testid="input-from-location"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                    <Input
                      id="to"
                      placeholder="Enter arrival city/station"
                      className="pl-10"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      data-testid="input-to-location"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date of Travel</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      data-testid="input-travel-date"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <Label className="text-sm text-slate-500 dark:text-slate-400 mb-3 block">Popular Routes</Label>
                <div className="flex flex-wrap gap-2">
                  {popularRoutes.map((route, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                      onClick={() => handleQuickRoute(route)}
                      data-testid={`quick-route-${i}`}
                    >
                      {route.from} → {route.to}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4">
                <Link href="/categories">
                  <Button variant="outline" className="gap-2" data-testid="button-back">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </Link>
                <Button
                  className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  disabled={!isFormValid}
                  onClick={handleContinue}
                  data-testid="button-continue"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Not sure about exact locations?{" "}
              <span className="text-blue-600">Enter approximate details</span> - our system is flexible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
