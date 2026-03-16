import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { customers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCustomer, loginCustomer } = useAuth();
  const [email, setEmail] = useState('compras@techcorp.co');
  const [password, setPassword] = useState('Cliente123*');
  const [error, setError] = useState('');

  if (isCustomer) {
    return <Navigate to="/account" replace />;
  }

  const from = (location.state as { from?: string } | null)?.from ?? '/account';
  const frequentCustomers = customers.filter((customer) => customer.kind === 'account');

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <section className="rounded-[32px] bg-slate-950 p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
          Area de cliente
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">
          Historial, seguimiento y entregables en una sola vista
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Este login es solo para clientes frecuentes. Los ocasionales pueden consultar el estado con
          codigo o enlace sin necesidad de crear cuenta.
        </p>
      </section>

      <section className="panel-card p-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Ingresar</h2>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const result = loginCustomer(email, password);
            if (!result.ok) {
              setError(result.error ?? 'No fue posible iniciar sesion.');
              return;
            }

            navigate(from, { replace: true });
          }}
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Correo</span>
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
            Entrar al portal privado
          </button>
        </form>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
            Credenciales demo
          </p>
          <div className="mt-4 grid gap-3">
            {frequentCustomers.map((customer) => (
              <button
                key={customer.id}
                type="button"
                onClick={() => {
                  setEmail(customer.email);
                  setPassword(customer.password);
                  setError('');
                }}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-[var(--brand)] hover:bg-slate-50"
              >
                <div>
                  <p className="font-semibold text-slate-950">{customer.name}</p>
                  <p className="text-sm text-slate-500">{customer.email}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Autofill
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
