import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusClasses: Record<string, string> = {
    open: 'bg-blue-500 text-white border-blue-600',
    'in progress': 'bg-amber-500 text-white border-amber-600',
    in_progress: 'bg-amber-500 text-white border-amber-600',
    resolved: 'bg-emerald-500 text-white border-emerald-600',
    closed: 'bg-gray-500 text-white border-gray-600',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border',
      statusClasses[status.toLowerCase()] || 'bg-muted text-muted-foreground border-muted',
      className
    )}>
      {status.replace('_', ' ')}
    </span>
  );
}
