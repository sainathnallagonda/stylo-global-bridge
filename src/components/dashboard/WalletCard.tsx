
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

const WalletCard = () => {
  const { fromCountry, getCurrencyDisplay } = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);

  const balances = {
    USD: 250.75,
    INR: 18650.50
  };

  const recentTransactions = [
    { type: 'sent', amount: 50, currency: 'USD' as const, to: 'Food Delivery', date: '2 hours ago' },
    { type: 'received', amount: 2000, currency: 'INR' as const, from: 'Gift Received', date: '1 day ago' },
    { type: 'sent', amount: 35, currency: 'USD' as const, to: 'Ride Booking', date: '3 days ago' }
  ];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            My Wallet
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFlipped(!isFlipped)}
            className="text-white hover:bg-white/20"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!isFlipped ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">USD Balance</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getCurrencyDisplay(balances.USD, 'USD')}
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">INR Balance</p>
                <p className="text-2xl font-bold text-orange-600">
                  {getCurrencyDisplay(balances.INR, 'INR')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Add Money
              </Button>
              <Button variant="outline" className="flex-1">
                Transfer
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Recent Transactions</h4>
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  {transaction.type === 'sent' ? (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.type === 'sent' ? transaction.to : transaction.from}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <Badge variant={transaction.type === 'sent' ? 'destructive' : 'default'}>
                  {transaction.type === 'sent' ? '-' : '+'}
                  {getCurrencyDisplay(transaction.amount, transaction.currency)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletCard;
