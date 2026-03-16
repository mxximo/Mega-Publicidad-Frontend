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
  slate: 'bg-slate-900 text-white',
  indigo: 'bg-indigo-600 text-white',
  emerald: 'bg-emerald-500 text-white',
  amber: 'bg-amber-400 text-slate-900',
  rose: 'bg-rose-500 text-white',
};

export default function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'slate',
}: MetricCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {hint ? <p className="text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}
