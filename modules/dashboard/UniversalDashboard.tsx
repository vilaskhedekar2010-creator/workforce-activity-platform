"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase-client";

import DashboardLayout from "./DashboardLayout";
import DashboardLoader from "./DashboardLoader";

import { SERVICES } from "@/shared/constants/services";


export default function UniversalDashboard() {

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);

  const [profile, setProfile] = useState<any>(null);

  const [allowedServices, setAllowedServices] = useState<string[]>([]);

  const [activeService, setActiveService] =
  useState<string>(SERVICES.HOME);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        window.location.href = "/login";

        return;

      }

      setUser(user);

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (!profile) {

        alert("Profile not found");

        return;

      }

      setProfile(profile);

      // Temporary
      // Later this will come from user_services table
      const { data: services } = await supabase
        .from("user_services")
        .select("service_code")
        .eq("user_id", user.id)
        .eq("is_active", true);

      const serviceCodes =
        services?.map((s) => s.service_code) ?? [];

      setAllowedServices(serviceCodes);

      if (serviceCodes.length > 0) {
        setActiveService(serviceCodes[0]);
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <DashboardLoader />;

  }

  return (

    <DashboardLayout

      user={user}

      profile={profile}

      allowedServices={allowedServices}

      activeService={activeService}

      setActiveService={setActiveService}

    />

  );

}