
-- Add photo confirmations to order tracking
ALTER TABLE public.order_tracking 
ADD COLUMN photo_url TEXT,
ADD COLUMN delivery_notes TEXT;

-- Create table for smart recommendations
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  service_type TEXT NOT NULL,
  item_data JSONB NOT NULL,
  score DECIMAL NOT NULL DEFAULT 0,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create table for subscription services
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  service_type TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('weekly', 'bi-weekly', 'monthly')),
  items JSONB NOT NULL,
  delivery_address JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  next_delivery_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for recommendations
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations" 
  ON public.recommendations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recommendations" 
  ON public.recommendations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" 
  ON public.subscriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to generate smart recommendations
CREATE OR REPLACE FUNCTION public.generate_recommendations(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Clear old recommendations
  DELETE FROM public.recommendations 
  WHERE user_id = user_uuid AND expires_at < now();
  
  -- Generate recommendations based on order history
  INSERT INTO public.recommendations (user_id, service_type, item_data, score, reason, expires_at)
  SELECT 
    user_uuid,
    o.service_type,
    jsonb_build_object(
      'title', 'Recommended based on your orders',
      'description', 'You might like this ' || o.service_type || ' service',
      'price', AVG(o.total_amount),
      'currency', o.currency
    ),
    COUNT(*) * 10 as score,
    'Based on your ' || COUNT(*) || ' previous orders',
    now() + interval '7 days'
  FROM public.orders o
  WHERE o.user_id = user_uuid
    AND o.created_at > now() - interval '30 days'
  GROUP BY o.service_type, o.currency
  HAVING COUNT(*) >= 2;
END;
$$;

-- Enable realtime for order tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recommendations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;
