
-- Phase 1: Database Schema Updates for Vendor/Customer Separation

-- Add vendor business profiles table
CREATE TABLE public.vendor_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_description TEXT,
  business_address JSONB NOT NULL,
  service_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  business_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
  contact_phone TEXT,
  business_license TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vendor_id)
);

-- Add location and service area to vendor_foods
ALTER TABLE public.vendor_foods 
ADD COLUMN service_areas JSONB DEFAULT '[]'::jsonb,
ADD COLUMN vendor_location JSONB,
ADD COLUMN delivery_radius INTEGER DEFAULT 10;

-- Add customer location preferences
ALTER TABLE public.profiles 
ADD COLUMN current_location JSONB,
ADD COLUMN preferred_delivery_address JSONB;

-- Enable RLS on vendor_profiles
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vendor_profiles
CREATE POLICY "Vendors can manage their own profile" 
  ON public.vendor_profiles 
  FOR ALL 
  USING (auth.uid() = vendor_id);

CREATE POLICY "Customers can view active vendor profiles" 
  ON public.vendor_profiles 
  FOR SELECT 
  USING (is_active = true AND is_verified = true);

-- Update vendor_foods RLS to be more restrictive
DROP POLICY IF EXISTS "Everyone can view available foods" ON public.vendor_foods;

CREATE POLICY "Customers can view available foods from verified vendors" 
  ON public.vendor_foods 
  FOR SELECT 
  USING (
    is_available = true 
    AND EXISTS (
      SELECT 1 FROM public.vendor_profiles vp 
      WHERE vp.vendor_id = vendor_foods.vendor_id 
      AND vp.is_active = true 
      AND vp.is_verified = true
    )
  );

-- Add order assignment to specific vendors
ALTER TABLE public.orders 
ADD COLUMN assigned_vendor_id UUID REFERENCES auth.users(id),
ADD COLUMN vendor_status TEXT DEFAULT 'pending' CHECK (vendor_status IN ('pending', 'accepted', 'preparing', 'ready', 'completed', 'rejected'));

-- Create vendor order management policies
CREATE POLICY "Vendors can view their assigned orders" 
  ON public.orders 
  FOR SELECT 
  USING (
    assigned_vendor_id = auth.uid() 
    OR (service_type = 'food-delivery' AND assigned_vendor_id IS NULL)
  );

CREATE POLICY "Vendors can update their order status" 
  ON public.orders 
  FOR UPDATE 
  USING (assigned_vendor_id = auth.uid());

-- Add trigger for vendor_profiles updated_at
CREATE TRIGGER update_vendor_profiles_updated_at 
  BEFORE UPDATE ON public.vendor_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to get nearby vendors
CREATE OR REPLACE FUNCTION public.get_nearby_vendors(
  customer_location JSONB,
  service_radius INTEGER DEFAULT 10
)
RETURNS TABLE (
  vendor_id UUID,
  business_name TEXT,
  distance_km NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    vp.vendor_id,
    vp.business_name,
    0::NUMERIC as distance_km -- Simplified for now, can add real distance calculation later
  FROM public.vendor_profiles vp
  WHERE vp.is_active = true 
    AND vp.is_verified = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
