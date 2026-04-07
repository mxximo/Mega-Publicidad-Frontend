import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

const toneStyles: Record<Tone, string> = {
  neutral: 'border-[var(--public-line)] bg-[rgba(255,255,255,0.06)] text-[var(--public-text-muted)]',
  info: 'border-[rgba(47,126,245,0.25)] bg-[rgba(47,126,245,0.12)] text-[#93bbfc]',
  success: 'border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.12)] text-[#6ee7b7]',
  warning: 'border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.12)] text-[#fcd34d]',
  danger: 'border-[rgba(251,113,133,0.25)] bg-[rgba(251,113,133,0.12)] text-[#fda4af]',
  accent: 'border-[rgba(124,91,250,0.22)] bg-[rgba(124,91,250,0.12)] text-[#d4c5ff]',
};

interface PublicBadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export default function PublicBadge({ children, tone = 'neutral', className }: PublicBadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold', toneStyles[tone], className)}>
      {children}
    </span>
  );
}
