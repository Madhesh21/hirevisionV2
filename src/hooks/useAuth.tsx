import { useState, useEffect } from 'react';

// Temporary types until Supabase integration is ready
type User = {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
} | null;

type Session = {
  user: User;
} | null;

export const useAuth = () => {
  const [user, setUser] = useState<User>(null);
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, username: string) => {
    // Will be implemented once Supabase Cloud is ready
    console.log('SignUp will be available once Cloud provisioning completes');
    return { data: null, error: new Error('Cloud is still provisioning') };
  };

  const signIn = async (email: string, password: string) => {
    // Will be implemented once Supabase Cloud is ready
    console.log('SignIn will be available once Cloud provisioning completes');
    return { data: null, error: new Error('Cloud is still provisioning') };
  };

  const signOut = async () => {
    // Will be implemented once Supabase Cloud is ready
    return { error: null };
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
