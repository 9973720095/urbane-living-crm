"use client";

interface Props {
  title: string;
  value: number;
  icon: string;
  color?: string;
  trend?: string;
}

export default function StatsCards({
  title,
  value,
  icon,
  color = "bg-white",
  trend,
}: Props) {
  return (
    <div
      className={`
      ${color}
      rounded-3xl
      border
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      p-6
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-800">
            {value}
          </h2>

          {trend && (
            <p className="mt-2 text-xs font-medium text-green-600">
              ↑ {trend}
            </p>
          )}
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center text-3xl">
          {icon}
        </div>
      </div>
    </div>
  );
}