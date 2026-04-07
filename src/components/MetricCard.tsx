import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: 'slate' | 'indigo' | 'emerald' | 'amber' | 'rose';
}

const toneMap = {
  slate: 'bg-[rgba(255,255,255,0.08)] text-[var(--admin-ink)]',
  indigo: 'bg-[rgba(99,102,241,0.15)] text-[#a5b4fc]',
  emerald: 'bg-[var(--admin-green-bg)] text-[var(--admin-green)]',
  amber: 'bg-[var(--admin-amber-bg)] text-[var(--admin-amber)]',
  rose: 'bg-[var(--admin-accent-bg)] text-[var(--admin-accent)]',
};

export default function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'slate',
}: MetricCardProps) {
  return (
    <div className="admin-panel p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--admin-ink2)]">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-[var(--admin-ink)]">{value}</p>
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {hint ? <p className="text-sm text-[var(--admin-ink2)]">{hint}</p> : null}
    </div>
  );
}
