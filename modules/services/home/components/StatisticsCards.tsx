"use client";

import type { HomeStatistics } from "../types/home.types";

type Props = {
  stats: HomeStatistics;
};

export default function StatisticsCards({
  stats,
}: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card title="Assigned Groups" value={stats.assignedGroups} color="text-blue-700" />
      <Card title="Messages" value={stats.messages} color="text-green-700" />
      <Card title="Tasks" value={stats.tasks} color="text-yellow-600" />
    </div>
  );
}

type CardProps = {
  title: string;
  value: number;
  color: string;
};

function Card({
  title,
  value,
  color,
}: CardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h2 className={`text-5xl font-bold ${color}`}>
        {value}
      </h2>

      <p className="mt-3 text-xl">
        {title}
      </p>
    </div>
  );
}