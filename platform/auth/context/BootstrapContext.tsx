"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { supabase } from "@/lib/supabase-client";
import { BootstrapService } from "../services/bootstrap.service";

interface BootstrapContextType {
  loading: boolean;
  authenticated: boolean;
  user: any;
  profile: any;
  refresh: () => Promise<void>;
}

const BootstrapContext =
  createContext<BootstrapContextType | null>(null);

export function BootstrapProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  const [user, setUser] = useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

async function refresh() {
  setLoading(true);

  try {
    const result = await BootstrapService.bootstrap();

    setAuthenticated(result.authenticated);
    setUser(result.user ?? null);
    setProfile(result.profile ?? null);
  } catch (error) {
    console.error("Bootstrap failed:", error);

    setAuthenticated(false);
    setUser(null);
    setProfile(null);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  refresh();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(() => {
    refresh();
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  return (
    <BootstrapContext.Provider
      value={{
        loading,
        authenticated,
        user,
        profile,
        refresh,
      }}
    >
      {children}
    </BootstrapContext.Provider>
  );
}

export function useBootstrap() {
  const context =
    useContext(BootstrapContext);

  if (!context) {
    throw new Error(
      "useBootstrap must be used inside BootstrapProvider."
    );
  }

  return context;
}