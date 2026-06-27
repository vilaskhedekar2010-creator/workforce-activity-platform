import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}

export default function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className={`text-4xl font-bold tracking-tight ${color}`}>
        {value}
      </div>

      <div className="mt-3 border-t border-slate-100 pt-3">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>
      </div>
    </div>
  );
}