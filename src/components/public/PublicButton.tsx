import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PublicButtonProps {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  onClick?: () => void;
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
  type = 'button',
  onClick,
}: PublicButtonProps) {
  const classes = cn(baseClasses[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (!href) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
