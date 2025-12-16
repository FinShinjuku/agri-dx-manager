import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: {
    bg: "bg-white",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  success: {
    bg: "bg-white",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  warning: {
    bg: "bg-white",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  danger: {
    bg: "bg-white",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn("rounded-2xl border border-gray-200 p-6", styles.bg)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}% 前日比
            </p>
          )}
        </div>
        <div className={cn("rounded-xl p-3", styles.iconBg)}>
          <Icon className={cn("h-6 w-6", styles.iconColor)} />
        </div>
      </div>
    </div>
  );
}
