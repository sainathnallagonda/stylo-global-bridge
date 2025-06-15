
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  vendor_id: string;
  user_id: string;
  order_id: string | null;
  rating: number;
  review_text: string | null;
  is_verified: boolean;
  created_at: string;
  profiles?: {
    full_name: string | null;
  };
}

interface VendorReviewsProps {
  vendorId: string;
  allowReview?: boolean;
  orderId?: string;
}

const VendorReviews = ({ vendorId, allowReview = false, orderId }: VendorReviewsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [vendorId]);

  const fetchReviews = async () => {
    try {
      // For now, since vendor_reviews table might not be available in types yet,
      // we'll use mock data and show the UI structure
      const mockReviews: Review[] = [
        {
          id: '1',
          vendor_id: vendorId,
          user_id: 'user1',
          order_id: 'order1',
          rating: 5,
          review_text: 'Amazing food! The flavors were incredible and delivery was fast.',
          is_verified: true,
          created_at: new Date().toISOString(),
          profiles: {
            full_name: 'John Doe'
          }
        },
        {
          id: '2',
          vendor_id: vendorId,
          user_id: 'user2',
          order_id: null,
          rating: 4,
          review_text: 'Good quality food, will order again.',
          is_verified: false,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          profiles: {
            full_name: 'Jane Smith'
          }
        }
      ];

      setReviews(mockReviews);
      
      if (mockReviews.length > 0) {
        const avg = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
        setAverageRating(Number(avg.toFixed(1)));
        setTotalReviews(mockReviews.length);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!user) return;

    setSubmitting(true);
    try {
      // For now, we'll simulate the review submission
      // Once the database migration is complete, this will use the actual table
      const newReview: Review = {
        id: Date.now().toString(),
        vendor_id: vendorId,
        user_id: user.id,
        order_id: orderId || null,
        rating,
        review_text: reviewText.trim() || null,
        is_verified: !!orderId,
        created_at: new Date().toISOString(),
        profiles: {
          full_name: 'Current User'
        }
      };

      setReviews(prev => [newReview, ...prev]);
      
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });

      setShowReviewForm(false);
      setReviewText('');
      setRating(5);
      
      // Recalculate averages
      const allReviews = [newReview, ...reviews];
      const avg = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
      setAverageRating(Number(avg.toFixed(1)));
      setTotalReviews(allReviews.length);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Reviews & Ratings
          </CardTitle>
          {allowReview && user && (
            <Button
              size="sm"
              onClick={() => setShowReviewForm(true)}
              disabled={showReviewForm}
            >
              Write Review
            </Button>
          )}
        </div>
        {totalReviews > 0 && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <span className="font-medium">{averageRating}</span>
            </div>
            <span>({totalReviews} review{totalReviews !== 1 ? 's' : ''})</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {showReviewForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-3">Write a Review</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="mt-1">
                  {renderStars(rating, true, setRating)}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Your Review</label>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={submitReview} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowReviewForm(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-sm">
                      {review.profiles?.full_name || 'Anonymous User'}
                    </span>
                    {review.is_verified && (
                      <Badge variant="outline" className="text-xs">
                        <ThumbsUp className="h-2 w-2 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                {review.review_text && (
                  <p className="text-sm text-gray-700">{review.review_text}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorReviews;
