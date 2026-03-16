import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      <p className="public-kicker">{kicker}</p>
      <h2 className={cn('mt-3 text-3xl font-black tracking-tight text-[var(--public-text)] sm:text-4xl')}>
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-3xl text-sm leading-7 text-[var(--public-text-muted)] sm:text-base',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
