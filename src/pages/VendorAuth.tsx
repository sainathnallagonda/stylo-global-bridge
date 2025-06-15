
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ArrowLeft, Store, TrendingUp, Users, ChefHat, DollarSign, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const VendorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back, Partner!",
            description: "Redirecting to your vendor dashboard..."
          });
          navigate('/vendor-dashboard');
        }
      } else {
        const { error } = await signUp(email, password, fullName, 'vendor');
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Vendor Account Created!",
            description: "Please check your email to verify your account before accessing your dashboard."
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
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
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Stylo for Business
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Grow Your Food Business with Stylo
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of successful vendors who are expanding their reach and increasing sales through our platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Reach More Customers</h3>
                <p className="text-sm text-gray-600">Access our growing customer base</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Boost Sales</h3>
                <p className="text-sm text-gray-600">Increase revenue with our tools</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                <ChefHat className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Easy Management</h3>
                <p className="text-sm text-gray-600">Simple menu and order management</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                <DollarSign className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Fast Payments</h3>
                <p className="text-sm text-gray-600">Quick and secure payment processing</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">✨ Special Launch Offer</h4>
              <p className="text-sm text-blue-800">
                <Clock className="h-4 w-4 inline mr-1" />
                Zero commission for your first 100 orders!
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Store className="h-6 w-6 text-blue-600" />
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">
                {isLogin ? 'Welcome Back, Partner!' : 'Start Your Journey'}
              </CardTitle>
              <CardDescription>
                {isLogin ? 'Access your business dashboard' : 'Create your vendor account to start selling'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Business Owner Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      placeholder="Enter business owner name"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your business email"
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
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={loading}
                >
                  {loading ? 'Loading...' : (isLogin ? 'Access Dashboard' : 'Start Selling')}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:underline"
                >
                  {isLogin ? "New to Stylo? Create vendor account" : "Already a partner? Sign in"}
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/customer-auth')}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Looking to order food? Customer login →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorAuth;
