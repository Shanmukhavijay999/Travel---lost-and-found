import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bus,
  Train,
  Car,
  Bike,
  MapPin,
  ArrowRight,
  Shield,
  Clock,
  MessageSquare,
  CheckCircle,
  Users,
  Star,
  Zap,
  QrCode,
  Navigation,
  Smartphone,
} from "lucide-react";

const transportModes = [
  { icon: Bus, label: "Bus", color: "from-orange-500 to-red-500", delay: "0ms" },
  { icon: Train, label: "Train", color: "from-blue-500 to-indigo-600", delay: "100ms" },
  { icon: Bike, label: "Auto", color: "from-green-500 to-emerald-600", delay: "200ms" },
  { icon: Car, label: "Cab", color: "from-purple-500 to-pink-600", delay: "300ms" },
  { icon: Train, label: "Metro", color: "from-cyan-500 to-blue-600", delay: "400ms" },
];

const steps = [
  {
    number: "01",
    title: "Report Lost Item",
    description: "Select your transport mode, enter journey details, and describe your lost item with as much detail as possible.",
    icon: Search,
    color: "from-blue-500 to-indigo-600",
  },
  {
    number: "02",
    title: "Driver Gets Notified",
    description: "Drivers on matching routes receive your request and check their vehicles for your item.",
    icon: MessageSquare,
    color: "from-purple-500 to-pink-600",
  },
  {
    number: "03",
    title: "Item Found Notification",
    description: "When a driver finds your item, you get notified instantly with photo proof and driver details.",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
  },
];

const features = [
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "All drivers are verified. Your personal information is protected until you approve.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get instant notifications when your item status changes or a driver responds.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: MessageSquare,
    title: "Direct Chat",
    description: "Communicate directly with drivers through our secure messaging system.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of travelers and drivers helping each other recover lost items.",
    gradient: "from-orange-500 to-red-500",
  },
];

const stats = [
  { value: "10K+", label: "Items Recovered" },
  { value: "50K+", label: "Active Users" },
  { value: "5K+", label: "Verified Drivers" },
  { value: "98%", label: "Success Rate" },
];

const futureFeatures = [
  { icon: Zap, label: "AI Image Match", description: "Auto-identify items using AI" },
  { icon: QrCode, label: "QR Scanning", description: "Instant vehicle verification" },
  { icon: Navigation, label: "GPS Integration", description: "Real-time route tracking" },
  { icon: Smartphone, label: "WhatsApp Alerts", description: "Get notified everywhere" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDE0di0yaDIyek0zNiAyNnYySDE0di0yaDIyek0zNiAyMnYySDE0di0yaDIyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="flex justify-center mb-6">
            <Badge className="px-4 py-2 text-sm font-medium bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              Trusted by 50,000+ Travelers
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Lost Something?
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              We'll Help You Find It
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with drivers to recover items lost during bus, train, auto, cab, or metro journeys. 
            Quick, secure, and reliable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/categories">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-2xl shadow-black/20"
                data-testid="hero-search-button"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Lost Item
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                data-testid="hero-learn-button"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {transportModes.map((mode) => (
              <Link key={mode.label} href="/categories">
                <Card
                  className="group bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/20"
                  data-testid={`transport-${mode.label.toLowerCase()}`}
                >
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-lg`}>
                      <mode.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">{mode.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Three Simple Steps to Recovery
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our streamlined process makes it easy to report and recover your lost items.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <Card className="h-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute top-4 right-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-slate-300 dark:text-slate-700">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose LostFound?
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              We've built the most comprehensive lost and found platform for travelers.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="bg-white/10 border-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Coming Soon</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Future Enhancements
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We're constantly improving our platform with cutting-edge features.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureFeatures.map((feature, i) => (
              <Card
                key={i}
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-slate-400" />
                  </div>
                  <Badge variant="secondary" className="mb-3 text-xs">Coming Soon</Badge>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.label}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Lost Item?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have successfully recovered their belongings through our platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-2xl"
                data-testid="cta-signup"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                data-testid="cta-report"
              >
                Report Lost Item
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
