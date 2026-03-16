import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="panel-card flex flex-col items-start gap-4 p-6">
      <div className="rounded-2xl bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-white">
        Sin datos
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
