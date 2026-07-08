"use client";

import WelcomeBanner from "./components/WelcomeBanner";
import StatisticsCards from "./components/StatisticsCards";
import { useHome } from "./hooks/useHome";

export default function Home() {

  const stats = useHome();

  return (
    <div className="space-y-8 p-6">
      <WelcomeBanner />
      <StatisticsCards stats={stats} />
    </div>
  );
}