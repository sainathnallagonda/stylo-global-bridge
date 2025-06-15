
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Gift, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface LoyaltyTransaction {
  id: string;
  points: number;
  transaction_type: 'earned' | 'redeemed' | 'expired';
  transaction_reason: string;
  created_at: string;
}

const LoyaltyPoints = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [totalPoints, setTotalPoints] = useState(0);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
    }
  }, [user]);

  const fetchLoyaltyData = async () => {
    if (!user) return;

    try {
      // Fetch total points
      const { data: pointsData, error: pointsError } = await supabase
        .rpc('get_user_loyalty_points', { user_uuid: user.id });

      if (pointsError) throw pointsError;
      setTotalPoints(pointsData || 0);

      // Fetch transaction history
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (transactionsError) throw transactionsError;
      setTransactions(transactionsData || []);
    } catch (error) {
      console.error('Error fetching loyalty data:', error);
      toast({
        title: "Error",
        description: "Failed to load loyalty points data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'redeemed': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'expired': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-green-600';
      case 'redeemed': return 'text-red-600';
      case 'expired': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getPointsDisplay = (points: number, type: string) => {
    const prefix = type === 'earned' ? '+' : '-';
    return type === 'earned' ? `${prefix}${points}` : `${prefix}${points}`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading rewards...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
            <p className="text-purple-100">Available for redemption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{transactions
                .filter(t => 
                  t.transaction_type === 'earned' && 
                  new Date(t.created_at).getMonth() === new Date().getMonth()
                )
                .reduce((sum, t) => sum + t.points, 0)
                .toLocaleString()}
            </div>
            <p className="text-gray-600">Points earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Rewards Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.floor(totalPoints / 100)}
            </div>
            <p className="text-gray-600">Discounts (100 pts = $1)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">10</span>
              </div>
              <div>
                <h4 className="font-semibold">Complete an Order</h4>
                <p className="text-sm text-gray-600">Earn 10 points per $1 spent</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">50</span>
              </div>
              <div>
                <h4 className="font-semibold">Write a Review</h4>
                <p className="text-sm text-gray-600">Get 50 points for each review</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">100</span>
              </div>
              <div>
                <h4 className="font-semibold">Refer a Friend</h4>
                <p className="text-sm text-gray-600">Both get 100 points</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">25</span>
              </div>
              <div>
                <h4 className="font-semibold">Daily Login</h4>
                <p className="text-sm text-gray-600">Earn 25 points daily</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <Button variant="outline" size="sm">
              Redeem Points
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.transaction_type)}
                    <div>
                      <p className="font-medium">{transaction.transaction_reason}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(transaction.created_at), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={getTransactionColor(transaction.transaction_type)}
                    >
                      {transaction.transaction_type}
                    </Badge>
                    <span className={`font-bold ${getTransactionColor(transaction.transaction_type)}`}>
                      {getPointsDisplay(transaction.points, transaction.transaction_type)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyPoints;
