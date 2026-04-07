import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Wallet, SwatchBook } from 'lucide-react';
import { internalUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const roleIcons = {
  admin: Shield,
  cashier: Wallet,
  designer: SwatchBook,
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEmployee, loginEmployee } = useAuth();
  const [email, setEmail] = useState('admin@graficapro.co');
  const [password, setPassword] = useState('Admin123*');
  const [error, setError] = useState('');

  if (isEmployee) {
    return <Navigate to="/admin" replace />;
  }

  const from = (location.state as { from?: string } | null)?.from ?? '/admin';

  return (
    <div className="admin-theme-root min-h-screen px-4 py-10 sm:px-6 lg:px-8" data-admin-theme="dark">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="admin-panel-soft rounded-xl p-8">
          <p className="admin-kicker">Acceso interno</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight admin-text">
            Un solo login para empleados, permisos distintos por rol
          </h1>
          <p className="mt-4 text-sm admin-text-muted">
            El sistema persiste la sesion local, protege rutas por permiso y diferencia las
            experiencias de administrador, caja y produccion creativa.
          </p>
        </section>

        <section className="admin-panel p-8">
          <h2 className="text-2xl font-black tracking-tight admin-text">Ingresar al workspace</h2>
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              const result = loginEmployee(email, password);
              if (!result.ok) {
                setError(result.error ?? 'No fue posible iniciar sesion.');
                return;
              }

              navigate(from, { replace: true });
            }}
          >
            <label className="block">
              <span className="text-sm font-medium admin-text-muted">Correo corporativo</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="admin-input mt-2 !rounded-lg"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium admin-text-muted">Contrasena</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input mt-2 !rounded-lg"
              />
            </label>
            {error ? <p className="text-sm font-medium text-[var(--admin-accent)]">{error}</p> : null}
            <button className="admin-primary-button w-full rounded-lg px-5 py-2.5 text-sm font-bold">
              Entrar al panel
            </button>
          </form>

          <div className="mt-8">
            <p className="admin-kicker">Accesos demo</p>
            <div className="mt-4 grid gap-3">
              {internalUsers.map((user) => {
                const Icon = roleIcons[user.role];
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => {
                      setEmail(user.email);
                      setPassword(user.password);
                      setError('');
                    }}
                    className="flex items-center justify-between rounded-lg border border-[var(--admin-border)] px-4 py-3 text-left transition hover:border-[var(--admin-accent)] hover:bg-[var(--admin-surface2)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[var(--admin-surface2)] p-3">
                        <Icon className="h-5 w-5 admin-text-muted" />
                      </div>
                      <div>
                        <p className="font-semibold admin-text">{user.name}</p>
                        <p className="text-sm admin-text-muted">
                          {user.title} · {user.email}
                        </p>
                      </div>
                    </div>
                    <span className="admin-text-faint text-xs font-bold uppercase tracking-[0.18em]">
                      Autofill
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
