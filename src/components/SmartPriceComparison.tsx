
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingDown, TrendingUp, DollarSign, Star, MapPin } from 'lucide-react';

interface PriceComparisonItem {
  vendor: string;
  price: number;
  currency: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  originalPrice?: number;
  discount?: number;
}

interface SmartPriceComparisonProps {
  itemName: string;
  category: string;
  userLocation: string;
}

const SmartPriceComparison = ({ itemName, category, userLocation }: SmartPriceComparisonProps) => {
  const [priceData, setPriceData] = useState<PriceComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');

  useEffect(() => {
    fetchPriceComparison();
  }, [itemName, category, userLocation]);

  const fetchPriceComparison = async () => {
    try {
      setLoading(true);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: PriceComparisonItem[] = [
        {
          vendor: 'Pizza Palace',
          price: 12.99,
          currency: 'USD',
          rating: 4.8,
          distance: '0.5 mi',
          deliveryTime: '25-35 min',
          originalPrice: 15.99,
          discount: 19
        },
        {
          vendor: 'Tony\'s Pizzeria',
          price: 14.50,
          currency: 'USD',
          rating: 4.6,
          distance: '0.8 mi',
          deliveryTime: '30-40 min'
        },
        {
          vendor: 'Quick Bites',
          price: 11.99,
          currency: 'USD',
          rating: 4.2,
          distance: '1.2 mi',
          deliveryTime: '20-30 min',
          originalPrice: 13.99,
          discount: 14
        },
        {
          vendor: 'Gourmet Express',
          price: 16.99,
          currency: 'USD',
          rating: 4.9,
          distance: '0.3 mi',
          deliveryTime: '35-45 min'
        }
      ];

      setPriceData(mockData);
    } catch (error) {
      console.error('Error fetching price comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedData = [...priceData].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });

  const getBestDeal = () => {
    if (priceData.length === 0) return null;
    return priceData.reduce((best, current) => {
      const currentValue = (current.rating * 20) - current.price;
      const bestValue = (best.rating * 20) - best.price;
      return currentValue > bestValue ? current : best;
    });
  };

  const bestDeal = getBestDeal();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Smart Price Comparison
          <Badge variant="outline" className="ml-auto">
            {itemName}
          </Badge>
        </CardTitle>
        <div className="flex gap-2 mt-2">
          {(['price', 'rating', 'distance'] as const).map((option) => (
            <Button
              key={option}
              variant={sortBy === option ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy(option)}
              className="text-xs"
            >
              Sort by {option}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map((item, index) => (
            <div
              key={item.vendor}
              className={`p-4 rounded-lg border-2 transition-all ${
                bestDeal?.vendor === item.vendor
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{item.vendor}</h4>
                  {bestDeal?.vendor === item.vendor && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Best Deal
                    </Badge>
                  )}
                  {index === 0 && sortBy === 'price' && (
                    <Badge variant="outline" className="text-xs">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Lowest Price
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {item.discount && (
                    <Badge variant="destructive" className="text-xs">
                      -{item.discount}%
                    </Badge>
                  )}
                  <div className="text-right">
                    {item.originalPrice && (
                      <span className="text-sm line-through text-gray-500">
                        ${item.originalPrice}
                      </span>
                    )}
                    <span className="text-lg font-bold text-green-600 ml-1">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.distance}</span>
                  </div>
                </div>
                <span className="text-blue-600">{item.deliveryTime}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Price Insights</span>
          </div>
          <p className="text-sm text-blue-700">
            Average price for {itemName} in your area: <strong>${(priceData.reduce((sum, item) => sum + item.price, 0) / priceData.length).toFixed(2)}</strong>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            You could save up to <strong>${Math.max(...priceData.map(p => p.price)) - Math.min(...priceData.map(p => p.price))}</strong> by choosing the best option.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartPriceComparison;
