import { Bell, Boxes, LayoutDashboard, LogOut, ReceiptText, Settings, ShoppingCart, SwatchBook, Users } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import type { Permission } from '../types/domain';

type NavItem = {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  permission: Permission;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, permission: 'dashboard.view' },
  { label: 'Pedidos', path: '/admin/orders', icon: ReceiptText, permission: 'orders.view' },
  { label: 'Punto de venta', path: '/admin/pos', icon: ShoppingCart, permission: 'pos.use' },
  { label: 'Produccion', path: '/admin/production', icon: SwatchBook, permission: 'production.view' },
  { label: 'Inventario', path: '/admin/inventory', icon: Boxes, permission: 'inventory.view' },
  { label: 'Clientes', path: '/admin/customers', icon: Users, permission: 'customers.view' },
  { label: 'Configuracion', path: '/admin/settings', icon: Settings, permission: 'settings.view' },
];

const roleLabel = {
  admin: 'Super Administradora',
  cashier: 'Caja y ventas',
  designer: 'Disenador',
};

export default function AdminLayout() {
  const location = useLocation();
  const { hasPermission, logout, user } = useAuth();

  if (!user || !('role' in user)) {
    return null;
  }

  const allowedNavItems = navItems.filter((item) => hasPermission(item.permission));

  return (
    <div className="admin-theme-root flex min-h-screen" data-admin-theme="dark">
      {/* Sidebar — fixed full height */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-[var(--admin-border)] bg-[var(--sb-bg)]">
        {/* Brand */}
        <div className="border-b border-[var(--admin-border)] px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--admin-accent)] text-xs font-black text-white">
              MP
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--sb-text-hi)]">Mega Publicidad</p>
              <p className="text-xs text-[var(--sb-text)]">{roleLabel[user.role]}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--sb-section)]">
            Menu
          </p>
          <div className="grid gap-0.5">
            {allowedNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'admin-sidebar-link flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.82rem] font-medium transition',
                    isActive
                      ? 'bg-[var(--sb-active-bg)] text-[var(--admin-accent)]'
                      : 'text-[var(--sb-text)] hover:text-[var(--sb-text-hi)]',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User footer */}
        <div className="border-t border-[var(--admin-border)] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--admin-surface2)] text-xs font-bold text-[var(--sb-text-hi)]">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--sb-text-hi)]">{user.name}</p>
              <p className="truncate text-xs text-[var(--sb-text)]">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-medium text-[var(--sb-text)] transition hover:bg-[var(--sb-hover)] hover:text-[var(--sb-text-hi)]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Cerrar sesion
          </button>
        </div>
      </aside>

      {/* Main content — offset by sidebar width */}
      <div className="ml-60 flex min-h-screen flex-1 flex-col bg-[var(--admin-bg)]">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-bg)] px-6 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--admin-ink3)]">
              Panel interno
            </p>
            <p className="mt-0.5 text-sm font-medium text-[var(--admin-ink)]">
              Navegacion filtrada por permisos
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[var(--admin-surface2)] px-3 py-1.5 text-xs font-medium text-[var(--admin-ink2)]">
            <Bell className="h-3.5 w-3.5" />
            {user.role === 'admin'
              ? 'Supervisar y reasignar'
              : user.role === 'cashier'
                ? 'Caja y pedidos'
                : 'Mis trabajos'}
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
