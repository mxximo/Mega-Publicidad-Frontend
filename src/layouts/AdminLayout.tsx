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
    <div className="min-h-screen bg-[var(--bg)] text-slate-950">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6">
        <aside className="panel-card h-fit w-full p-4 lg:sticky lg:top-4 lg:w-72">
          <div className="rounded-[28px] bg-slate-950 p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Workspace</p>
            <h1 className="mt-3 text-2xl font-black tracking-tight">GraficaPro</h1>
            <p className="mt-2 text-sm text-slate-300">{roleLabel[user.role]}</p>
          </div>

          <nav className="mt-5 grid gap-2">
            {allowedNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[var(--brand)] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 rounded-[28px] border border-slate-200 p-4">
            <p className="font-semibold text-slate-950">{user.name}</p>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Cerrar sesion <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="panel-card mb-6 flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                Panel interno
              </p>
              <p className="mt-2 text-lg font-black tracking-tight text-slate-950">
                Navegacion filtrada por permisos y experiencia adaptada por rol
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              <Bell className="h-4 w-4" />
              {user.role === 'admin'
                ? 'Puedes supervisar y reasignar trabajos'
                : user.role === 'cashier'
                  ? 'Caja, pedidos y clientes listos'
                  : 'Tienes visibilidad solo sobre tus trabajos'}
            </div>
          </header>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
