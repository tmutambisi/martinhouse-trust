import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: string;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const severityClasses: Record<string, string> = {
    low: 'bg-emerald-500 text-white border-emerald-600',
    medium: 'bg-amber-500 text-white border-amber-600',
    high: 'bg-orange-500 text-white border-orange-600',
    critical: 'bg-red-600 text-white border-red-700',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
      severityClasses[severity.toLowerCase()] || 'bg-muted text-muted-foreground',
      className
    )}>
      {severity}
    </span>
  );
}
