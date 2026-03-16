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
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] bg-slate-950 p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
            Acceso interno
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Un solo login para empleados, permisos distintos por rol
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            El sistema persiste la sesion local, protege rutas por permiso y diferencia las
            experiencias de administrador, caja y produccion creativa.
          </p>
        </section>

        <section className="panel-card p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Ingresar al workspace</h2>
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
              <span className="text-sm font-medium text-slate-600">Correo corporativo</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--brand)]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Contrasena</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--brand)]"
              />
            </label>
            {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
            <button className="w-full rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-dark)]">
              Entrar al panel
            </button>
          </form>

          <div className="mt-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Accesos demo
            </p>
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
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-[var(--brand)] hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <Icon className="h-5 w-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">{user.name}</p>
                        <p className="text-sm text-slate-500">
                          {user.title} · {user.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
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
