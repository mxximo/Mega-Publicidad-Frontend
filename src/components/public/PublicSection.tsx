import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PublicSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PublicSection({
  children,
  className,
  containerClassName,
}: PublicSectionProps) {
  return (
    <section className={cn('public-section', className)}>
      <div className={cn('public-container', containerClassName)}>{children}</div>
    </section>
  );
}
