import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Train, Car, Bike, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "bus",
    icon: Bus,
    label: "Bus",
    description: "City buses, intercity, Volvo, sleeper",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    examples: ["KSRTC", "BMTC", "Redbus", "VRL Travels"],
  },
  {
    id: "train",
    icon: Train,
    label: "Train",
    description: "Local trains, express, metro rail",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    examples: ["Indian Railways", "Rajdhani", "Shatabdi", "Duronto"],
  },
  {
    id: "auto",
    icon: Bike,
    label: "Auto Rickshaw",
    description: "Three-wheelers, shared autos",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    examples: ["City Auto", "Shared Auto", "E-Auto"],
  },
  {
    id: "cab",
    icon: Car,
    label: "Cab / Taxi",
    description: "Ride-hailing services, airport cabs",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    examples: ["Uber", "Ola", "Rapido", "Airport Taxi"],
  },
  {
    id: "metro",
    icon: Train,
    label: "Metro",
    description: "City metro trains, monorail",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    examples: ["Delhi Metro", "Bangalore Metro", "Mumbai Metro"],
  },
];

export default function Categories() {
  const [, setLocation] = useLocation();

  const handleSelectCategory = (categoryId: string) => {
    localStorage.setItem("selectedTransport", categoryId);
    setLocation("/location");
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">Step 1 of 3</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Select Transport Mode
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Choose the type of transport where you lost your item. This helps us connect you with the right drivers.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${category.bgColor} border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600`}
                onClick={() => handleSelectCategory(category.id)}
                data-testid={`category-${category.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{category.label}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Can't find your transport mode?{" "}
              <Link href="/about" className="text-blue-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
