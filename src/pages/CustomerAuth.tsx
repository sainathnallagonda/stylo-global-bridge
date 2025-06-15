
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ArrowLeft, ShoppingCart, Utensils, Heart, Gift, Clock, Star } from 'lucide-react';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { useToast } from '@/hooks/use-toast';

const CustomerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useEnhancedAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !fullName)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message || "Invalid email or password",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back, Foodie!",
            description: "Ready to explore delicious options?"
          });
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password, fullName, 'customer');
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message || "Failed to create account",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account and start ordering."
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              Stylo
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Satisfy Your Cravings, Share the Love
              </h2>
              <p className="text-lg text-gray-600">
                Order from your favorite restaurants and send delicious meals, groceries, and gifts to your loved ones anywhere.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                <Utensils className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Fresh Food</h3>
                <p className="text-sm text-gray-600">From top-rated local restaurants</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                <Clock className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Average 30-min delivery time</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                <Gift className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Send Gifts</h3>
                <p className="text-sm text-gray-600">Surprise your loved ones</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <Star className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                <p className="text-sm text-gray-600">Verified vendors only</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">🎉 Welcome Offer</h4>
              <p className="text-sm text-orange-800">
                <Heart className="h-4 w-4 inline mr-1" />
                Get 20% off your first 3 orders + free delivery!
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
                <Utensils className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-orange-800">
                {isLogin ? 'Welcome Back, Foodie!' : 'Join the Stylo Family'}
              </CardTitle>
              <CardDescription>
                {isLogin ? 'Sign in to continue your food journey' : 'Create your account to start ordering delicious food'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    minLength={6}
                    disabled={loading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700" 
                  disabled={loading}
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In & Order' : 'Create Account')}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-orange-600 hover:underline"
                  disabled={loading}
                >
                  {isLogin ? "New to Stylo? Create account" : "Already have an account? Sign in"}
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/vendor-auth')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Want to sell food? Vendor registration →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;
