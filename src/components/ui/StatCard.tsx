import { Factory, Building2, Layers, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
  light?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  factory: Factory,
  building: Building2,
  layers: Layers,
  users: Users,
};

export default function StatCard({ value, label, icon, light = false }: StatCardProps) {
  const Icon = iconMap[icon] ?? Factory;

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-2xl",
        light
          ? "bg-white/10 border border-white/20"
          : "bg-white border border-gray-200 shadow-sm"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          light ? "bg-white/20" : "bg-blue-50"
        )}
      >
        <Icon
          size={22}
          className={light ? "text-white" : "text-blue-600"}
        />
      </div>
      <p
        className={cn(
          "text-2xl md:text-3xl font-extrabold mb-1",
          light ? "text-white" : "text-[#1a2744]"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "text-sm leading-snug",
          light ? "text-gray-300" : "text-gray-500"
        )}
      >
        {label}
      </p>
    </div>
  );
}
