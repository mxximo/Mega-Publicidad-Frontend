import type { Permission, Role } from '../types/domain';

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'dashboard.view',
    'orders.view',
    'orders.manage',
    'pos.use',
    'inventory.view',
    'inventory.manage',
    'customers.view',
    'customers.manage',
    'production.view',
    'production.assign',
    'production.update',
    'settings.view',
    'settings.manage',
  ],
  cashier: [
    'orders.view',
    'orders.manage',
    'pos.use',
    'inventory.view',
    'customers.view',
    'customers.manage',
  ],
  designer: [
    'production.view',
    'production.update',
  ],
};

export function getPermissionsForRole(role: Role): Permission[] {
  return rolePermissions[role];
}

export function roleHasPermission(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}
