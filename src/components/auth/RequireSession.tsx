import type { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Permission } from '../../types/domain';

interface RequireSessionProps {
  mode: 'employee' | 'customer';
  permission?: Permission;
  children: ReactElement;
}

export default function RequireSession({
  mode,
  permission,
  children,
}: RequireSessionProps) {
  const location = useLocation();
  const { hasPermission, isCustomer, isEmployee } = useAuth();

  if (mode === 'employee' && !isEmployee) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (mode === 'customer' && !isCustomer) {
    return <Navigate to="/account/login" replace state={{ from: location.pathname }} />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to={mode === 'employee' ? '/admin' : '/account'} replace />;
  }

  return children;
}
