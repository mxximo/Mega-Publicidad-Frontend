import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PublicCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export default function PublicCard({ children, className, strong = false }: PublicCardProps) {
  return <div className={cn(strong ? 'public-panel-strong' : 'public-card', className)}>{children}</div>;
}
