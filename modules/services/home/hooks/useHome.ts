"use client";

import { useMemo } from "react";
import { getHomeStatistics } from "../services/home.service";

export function useHome() {
  return useMemo(() => {
    return getHomeStatistics();
  }, []);
}