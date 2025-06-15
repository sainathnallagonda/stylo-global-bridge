
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';

interface EnhancedAuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'vendor';
}

const EnhancedAuthGuard = ({ children, requiredRole }: EnhancedAuthGuardProps) => {
  const { user, profile, loading } = useEnhancedAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('AuthGuard: No user found, redirecting to auth');
        navigate('/auth');
        return;
      }

      if (requiredRole && profile?.role !== requiredRole) {
        console.log(`AuthGuard: User role ${profile?.role} doesn't match required ${requiredRole}`);
        if (profile?.role === 'vendor') {
          navigate('/vendor-dashboard');
        } else if (profile?.role === 'customer') {
          navigate('/dashboard');
        } else {
          navigate('/auth');
        }
        return;
      }
    }
  }, [user, profile, loading, navigate, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default EnhancedAuthGuard;
