import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type BadgeTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent';

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-[rgba(255,255,255,0.08)] text-[var(--admin-ink2)] border-[var(--admin-border2)]',
  info: 'bg-[var(--admin-blue-bg)] text-[var(--admin-blue)] border-[rgba(96,165,250,0.2)]',
  success: 'bg-[var(--admin-green-bg)] text-[var(--admin-green)] border-[rgba(52,211,153,0.2)]',
  warning: 'bg-[var(--admin-amber-bg)] text-[var(--admin-amber)] border-[rgba(251,191,36,0.2)]',
  danger: 'bg-[rgba(251,113,133,0.12)] text-[#fda4af] border-[rgba(251,113,133,0.2)]',
  accent: 'bg-[var(--admin-accent-bg)] text-[var(--admin-accent)] border-[rgba(232,72,85,0.2)]',
};

interface StatusBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export default function StatusBadge({
  children,
  tone = 'neutral',
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
