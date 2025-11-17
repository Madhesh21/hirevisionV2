import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from 'react';

interface HeaderProps {
  showAuth?: boolean;
  userName?: string;
  showNavigation?: boolean;
  showBackToMain?: boolean;
  backToMainUrl?: string;
}

const Header = ({ showAuth = true, userName, showNavigation = false, showBackToMain = true, backToMainUrl = "/" }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        // Try to get username from user metadata first
        const username = user.user_metadata?.username;
        if (username) {
          setDisplayName(username);
        } else {
          // Fall back to fetching from profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .maybeSingle();
          
          if (profile?.username) {
            setDisplayName(profile.username);
          }
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
      navigate('/');
    }
  };

  const finalDisplayName = userName || displayName || 'User';

  return (
    <header className="w-full border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-foreground">
          HireVision
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-muted-foreground">
              Welcome, {finalDisplayName}
            </span>
          )}
          
          {showNavigation && (
            <>
              {showBackToMain && (
                <Button variant="outline" asChild>
                  <Link to={backToMainUrl}>Back to Main</Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link to="/chat">AI Interview</Link>
              </Button>
            </>
          )}

          {showAuth && !user && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}

          {user && (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
