
import { ArrowLeft, Plane, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Travel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Travel Companions
            </h1>
            <p className="text-gray-600 mt-2">Find trusted travel buddies for safe journeys</p>
          </div>
        </div>

        {/* Coming Soon */}
        <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We're working on building a trusted network of travel companions to help you or your loved ones travel safely between countries.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-teal-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Verified Profiles</h3>
                <p className="text-sm text-gray-600">All companions are background checked</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-cyan-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
                <p className="text-sm text-gray-600">Join a trusted travel community</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plane className="text-teal-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Safe Journeys</h3>
                <p className="text-sm text-gray-600">Travel with peace of mind</p>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 rounded-full px-8">
              Get Notified When Ready
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Travel;
