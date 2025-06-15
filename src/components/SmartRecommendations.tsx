
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, ShoppingBag, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  service_type: string;
  item_data: {
    title: string;
    description: string;
    price: number;
    currency: string;
  };
  score: number;
  reason: string;
  created_at: string;
}

const SmartRecommendations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      generateRecommendations();
      fetchRecommendations();
    }
  }, [user]);

  const generateRecommendations = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('generate_recommendations', {
        user_uuid: user.id
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };

  const fetchRecommendations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .order('score', { ascending: false })
        .limit(6);

      if (error) throw error;
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = (recommendation: Recommendation) => {
    toast({
      title: "Great choice!",
      description: `You selected ${recommendation.item_data.title}`,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Place some orders to get personalized recommendations!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Smart Recommendations
          <Badge className="bg-green-100 text-green-800">
            <Star className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleRecommendationClick(rec)}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="capitalize">
                  {rec.service_type}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs">{Math.round(rec.score / 10)}</span>
                </div>
              </div>
              <h4 className="font-medium mb-1">{rec.item_data.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{rec.item_data.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">
                  {rec.item_data.currency} {rec.item_data.price}
                </span>
                <Button size="sm" variant="outline">
                  Order Now
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {rec.reason}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
