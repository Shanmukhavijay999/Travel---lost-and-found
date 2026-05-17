import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Categories from "@/pages/Categories";
import Location from "@/pages/Location";
import VehicleSearch from "@/pages/VehicleSearch";
import PassengerDashboard from "@/pages/PassengerDashboard";
import DriverDashboard from "@/pages/DriverDashboard";
import DriverFoundItems from "@/pages/DriverFoundItems";
import UploadItem from "@/pages/UploadItem";
import ConversationsCenter from "@/pages/ConversationsCenter";
import Chat from "@/pages/Chat";
import FoundItemDetails from "@/pages/FoundItemDetails";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: string }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    const redirectPath = user?.role === "driver" ? "/driver-dashboard" : "/passenger-dashboard";
    return <Redirect to={redirectPath} />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/categories" component={Categories} />
      <Route path="/location" component={Location} />
      <Route path="/vehicle-search" component={VehicleSearch} />
      
      <Route path="/passenger-dashboard">
        <ProtectedRoute allowedRole="passenger">
          <PassengerDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/driver-dashboard">
        <ProtectedRoute allowedRole="driver">
          <DriverDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/driver/found-items">
        <ProtectedRoute allowedRole="driver">
          <DriverFoundItems />
        </ProtectedRoute>
      </Route>
      
      <Route path="/driver/upload-item/:requestId">
        <ProtectedRoute allowedRole="driver">
          <UploadItem />
        </ProtectedRoute>
      </Route>
      
      <Route path="/conversations">
        <ProtectedRoute>
          <ConversationsCenter />
        </ProtectedRoute>
      </Route>
      
      <Route path="/chat/:requestId">
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </Route>
      
      <Route path="/found-item/:requestId">
        <ProtectedRoute>
          <FoundItemDetails />
        </ProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AppLayout />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
