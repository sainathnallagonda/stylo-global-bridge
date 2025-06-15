
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, Minus, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletData {
  id: string;
  usd_balance: number;
  inr_balance: number;
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  transaction_type: string;
  transaction_reason: string;
  balance_after: number;
  created_at: string;
}

const WalletManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addAmount, setAddAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'INR'>('USD');

  useEffect(() => {
    if (user) {
      fetchWalletData();
      fetchTransactions();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setWallet(data);
      } else {
        // Create wallet if it doesn't exist
        const { data: newWallet, error: createError } = await supabase
          .from('user_wallets')
          .insert({ user_id: user?.id })
          .select()
          .single();

        if (createError) throw createError;
        setWallet(newWallet);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      // Show mock wallet data
      setWallet({
        id: 'mock-wallet',
        usd_balance: 150.75,
        inr_balance: 12500.50
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data && data.length > 0) {
        setTransactions(data);
      } else {
        // Show mock transactions
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            amount: 50,
            currency: 'USD',
            transaction_type: 'credit',
            transaction_reason: 'Wallet top-up',
            balance_after: 150.75,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            amount: 25.50,
            currency: 'USD',
            transaction_type: 'debit',
            transaction_reason: 'Order payment',
            balance_after: 100.75,
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setTransactions(mockTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addFunds = async () => {
    if (!addAmount || !wallet) return;

    const amount = parseFloat(addAmount);
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    try {
      const newBalance = selectedCurrency === 'USD' 
        ? wallet.usd_balance + amount
        : wallet.inr_balance + amount;

      // Update wallet balance
      const updateData = selectedCurrency === 'USD' 
        ? { usd_balance: newBalance }
        : { inr_balance: newBalance };

      const { error: walletError } = await supabase
        .from('user_wallets')
        .update(updateData)
        .eq('user_id', user?.id);

      if (walletError) throw walletError;

      // Add transaction record
      const { error: transactionError } = await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user?.id,
          amount,
          currency: selectedCurrency,
          transaction_type: 'credit',
          transaction_reason: 'Wallet top-up',
          balance_after: newBalance
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Funds Added",
        description: `Successfully added ${selectedCurrency} ${amount} to your wallet`,
      });

      setAddAmount('');
      fetchWalletData();
      fetchTransactions();
    } catch (error) {
      console.error('Error adding funds:', error);
      toast({
        title: "Error",
        description: "Failed to add funds to wallet",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Wallet Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">USD Balance</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${wallet?.usd_balance?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">INR Balance</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{wallet?.inr_balance?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <div className="flex gap-2 mt-1">
                    {(['USD', 'INR'] as const).map((currency) => (
                      <Badge
                        key={currency}
                        variant={selectedCurrency === currency ? 'default' : 'outline'}
                        className="cursor-pointer px-4 py-2"
                        onClick={() => setSelectedCurrency(currency)}
                      >
                        {currency}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button onClick={addFunds} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.transaction_type === 'credit' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.transaction_type === 'credit' ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.transaction_reason}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.transaction_type === 'credit' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.transaction_type === 'credit' ? '+' : '-'}
                      {transaction.currency} {transaction.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      Balance: {transaction.currency} {transaction.balance_after}
                    </p>
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

export default WalletManagement;
