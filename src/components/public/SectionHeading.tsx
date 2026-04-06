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
    <div className={cn('gp-section-heading', align === 'center' && 'mx-auto text-center', className)}>
      <div className={cn('gp-section-heading-top', align === 'center' && 'justify-center')}>
        <span className="gp-section-heading-line" aria-hidden="true" />
        <p className="public-kicker">{kicker}</p>
      </div>
      <h2
        className={cn(
          'public-display mt-5 max-w-4xl text-[2rem] font-extrabold tracking-[-0.05em] text-[var(--public-text)] sm:text-[2.7rem] sm:leading-[1.02]',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-2xl text-sm leading-7 text-[var(--public-text-soft)] sm:text-[1.02rem] sm:leading-8',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
