
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import { LocationProvider } from "@/contexts/LocationContext";
import { LanguageProvider } from "@/components/MultiLanguageSupport";
import { AppStateProvider } from "@/contexts/AppStateContext";
import { NavigationProvider } from "@/components/navigation/NavigationProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CustomerAuth from "./pages/CustomerAuth";
import VendorAuth from "./pages/VendorAuth";
import CustomerDashboard from "./components/dashboard/CustomerDashboard";
import VendorDashboard from "./components/dashboard/VendorDashboard";
import Profile from "./pages/Profile";
import EnhancedFoodDelivery from "./pages/EnhancedFoodDelivery";
import Groceries from "./pages/Groceries";
import Gifts from "./pages/Gifts";
import Rides from "./pages/Rides";
import Travel from "./pages/Travel";
import Care from "./pages/Care";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import EnhancedAuthGuard from "./components/enhanced-auth/EnhancedAuthGuard";
import NotFound from "./pages/NotFound";
import FloatingActionButton from "./components/FloatingActionButton";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <EnhancedAuthProvider>
          <LocationProvider>
            <LanguageProvider>
              <AppStateProvider>
                <NavigationProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/customer-auth" element={<CustomerAuth />} />
                    <Route path="/vendor-auth" element={<VendorAuth />} />
                    
                    {/* Customer Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <EnhancedAuthGuard requiredRole="customer">
                          <CustomerDashboard />
                        </EnhancedAuthGuard>
                      } 
                    />
                    
                    {/* Vendor Routes */}
                    <Route 
                      path="/vendor-dashboard" 
                      element={
                        <EnhancedAuthGuard requiredRole="vendor">
                          <VendorDashboard />
                        </EnhancedAuthGuard>
                      } 
                    />
                    
                    {/* Shared Protected Routes */}
                    <Route 
                      path="/profile" 
                      element={
                        <EnhancedAuthGuard>
                          <Profile />
                        </EnhancedAuthGuard>
                      } 
                    />
                    <Route 
                      path="/orders" 
                      element={
                        <EnhancedAuthGuard>
                          <Orders />
                        </EnhancedAuthGuard>
                      } 
                    />
                    
                    {/* Service Routes */}
                    <Route path="/food-delivery" element={<EnhancedFoodDelivery />} />
                    <Route path="/groceries" element={<Groceries />} />
                    <Route path="/gifts" element={<Gifts />} />
                    <Route path="/rides" element={<Rides />} />
                    <Route path="/travel" element={<Travel />} />
                    <Route path="/care" element={<Care />} />
                    <Route path="/payment" element={<Payment />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <FloatingActionButton />
                  <Chatbot />
                </NavigationProvider>
              </AppStateProvider>
            </LanguageProvider>
          </LocationProvider>
        </EnhancedAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
