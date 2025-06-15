
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: 'customer' | 'vendor';
  current_location?: any;
  preferred_delivery_address?: any;
}

interface VendorProfile {
  id: string;
  vendor_id: string;
  business_name: string;
  business_description?: string;
  business_address: any;
  service_areas: any;  // Changed from any[] to any to match Json type
  business_hours: any;
  contact_phone?: string;
  business_license?: string;
  is_verified: boolean;
  is_active: boolean;
}

interface EnhancedAuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  vendorProfile: VendorProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: 'customer' | 'vendor') => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isVendor: boolean;
  isCustomer: boolean;
}

const EnhancedAuthContext = createContext<EnhancedAuthContextType | undefined>(undefined);

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (context === undefined) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};

export const EnhancedAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, current_location, preferred_delivery_address')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }
      
      const userProfile: Profile = {
        id: profileData.id,
        email: profileData.email,
        full_name: profileData.full_name,
        role: (profileData.role === 'vendor' ? 'vendor' : 'customer'),
        current_location: profileData.current_location,
        preferred_delivery_address: profileData.preferred_delivery_address
      };
      
      setProfile(userProfile);

      // If user is a vendor, fetch vendor profile
      if (userProfile.role === 'vendor') {
        const { data: vendorData, error: vendorError } = await supabase
          .from('vendor_profiles')
          .select('*')
          .eq('vendor_id', userId)
          .single();

        if (!vendorError && vendorData) {
          setVendorProfile(vendorData);
        } else {
          console.log('No vendor profile found or error:', vendorError);
          setVendorProfile(null);
        }
      } else {
        setVendorProfile(null);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: any = null;

    const initializeAuth = async () => {
      try {
        console.log('Initializing enhanced auth...');
        
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (!mounted) return;
        
        console.log('Initial session:', initialSession?.user?.id);
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
        }
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (!mounted) return;
            
            console.log('Auth state changed:', event, session?.user?.id);
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user && event !== 'TOKEN_REFRESHED') {
              await fetchProfile(session.user.id);
            } else if (!session) {
              setProfile(null);
              setVendorProfile(null);
            }
          }
        );

        authSubscription = subscription;
        setLoading(false);
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: 'customer' | 'vendor') => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
      setVendorProfile(null);
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    profile,
    vendorProfile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
    isVendor: profile?.role === 'vendor',
    isCustomer: profile?.role === 'customer'
  };

  return <EnhancedAuthContext.Provider value={value}>{children}</EnhancedAuthContext.Provider>;
};
