import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PublicButtonProps {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const baseClasses = {
  primary: 'public-button public-button-primary',
  secondary: 'public-button public-button-secondary',
};

export default function PublicButton({
  to,
  href,
  children,
  className,
  variant = 'primary',
}: PublicButtonProps) {
  const classes = cn(baseClasses[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
