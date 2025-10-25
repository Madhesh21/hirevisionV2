import { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { 
  signUp as amplifySignUp,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  getCurrentUser,
  fetchAuthSession,
  type AuthUser
} from 'aws-amplify/auth';
import { awsConfig } from '@/config/aws-config';

// Initialize Amplify
Amplify.configure(awsConfig);

interface CognitoSession {
  idToken?: string;
  accessToken?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<CognitoSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const currentSession = await fetchAuthSession();
      
      setUser(currentUser);
      setSession({
        idToken: currentSession.tokens?.idToken?.toString(),
        accessToken: currentSession.tokens?.accessToken?.toString(),
      });
    } catch (error) {
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await amplifySignUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name: username,
          },
        },
      });

      return { 
        data: { user: { id: userId } }, 
        error: null,
        nextStep 
      };
    } catch (error: any) {
      return { 
        data: null, 
        error: { message: error.message || 'Sign up failed' }
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { isSignedIn, nextStep } = await amplifySignIn({
        username: email,
        password,
      });

      if (isSignedIn) {
        await checkUser();
      }

      return { 
        data: { user }, 
        error: null,
        nextStep 
      };
    } catch (error: any) {
      return { 
        data: null, 
        error: { message: error.message || 'Sign in failed' }
      };
    }
  };

  const signOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error: any) {
      return { 
        error: { message: error.message || 'Sign out failed' }
      };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };
};
