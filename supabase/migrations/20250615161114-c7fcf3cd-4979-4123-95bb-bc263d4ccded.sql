
-- Create vendor_foods table for vendors to manage their food items
CREATE TABLE public.vendor_foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  image_url TEXT,
  category TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  preparation_time INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on vendor_foods
ALTER TABLE public.vendor_foods ENABLE ROW LEVEL SECURITY;

-- Create policies for vendor_foods
CREATE POLICY "Vendors can manage their own foods" 
  ON public.vendor_foods 
  FOR ALL 
  USING (auth.uid() = vendor_id);

CREATE POLICY "Everyone can view available foods" 
  ON public.vendor_foods 
  FOR SELECT 
  USING (is_available = true);

-- Create updated_at trigger for vendor_foods
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vendor_foods_updated_at 
  BEFORE UPDATE ON public.vendor_foods 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
