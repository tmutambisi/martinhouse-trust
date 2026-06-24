import { cn } from '@/lib/utils';
import { ComponentType } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'blue' | 'red' | 'green' | 'amber';
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, color = 'primary', className }: StatCardProps) {
  const colorMap = {
    primary: 'text-white bg-primary border-primary',
    secondary: 'text-white bg-secondary border-secondary',
    accent: 'text-white bg-accent border-accent',
    blue: 'text-white bg-blue-500 border-blue-600',
    red: 'text-white bg-red-500 border-red-600',
    green: 'text-white bg-emerald-500 border-emerald-600',
    amber: 'text-white bg-amber-500 border-amber-600',
  };

  const selectedColor = colorMap[color] || colorMap.primary;

  return (
    <div className={cn(
      'bg-card border border-border/50 rounded-xl p-6 shadow-elegant transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-1 tracking-wider uppercase">{title}</p>
          <p className="text-3xl font-extrabold text-foreground font-heading tracking-tight">{value}</p>
          {trend && (
            <p className={cn(
              'text-xs font-semibold mt-2 flex items-center gap-1 w-fit px-2 py-0.5 rounded-full',
              trend.isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border shadow-sm", selectedColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
