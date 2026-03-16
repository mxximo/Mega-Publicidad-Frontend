import { Download, LogOut, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { getJobsForCustomer, getOrdersForCustomer } from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';

const publicStatusLabels = {
  received: 'Recibido',
  scheduled: 'Programado',
  in_design: 'En desarrollo',
  in_review: 'En revision',
  ready_for_delivery: 'Listo para entrega',
  completed: 'Completado',
};

export default function CustomerDashboard() {
  const { logout, user } = useAuth();
  const customer = user && !('role' in user) ? user : null;

  if (!customer) {
    return null;
  }

  const customerOrders = getOrdersForCustomer(customer.id);
  const customerJobs = getJobsForCustomer(customer.id);
  const visibleFiles = customerJobs.flatMap((job) => job.files.filter((file) => file.visibleToCustomer));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Area privada</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Hola, {customer.name}</h1>
          <p className="mt-3 text-sm text-slate-500">
            Consulta tus pedidos, proyectos creativos y archivos habilitados para descarga.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/track"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Tracking abierto <PackageSearch className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            <span className="inline-flex items-center gap-2">
              Salir <LogOut className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-5">
          {customerOrders.length === 0 ? (
            <EmptyState
              title="Sin pedidos todavia"
              description="Cuando existan pedidos asociados a esta cuenta, apareceran aqui con su estado visible."
            />
          ) : (
            customerOrders.map((order) => (
              <article key={order.id} className="panel-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{order.trackingCode}</p>
                    <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                      {order.lineItems[0]?.name}
                    </h2>
                  </div>
                  <StatusBadge tone="info">{publicStatusLabels[order.publicStatus]}</StatusBadge>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Origen</p>
                    <p className="mt-2 text-sm font-semibold capitalize text-slate-950">{order.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Entrega</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{formatDateTime(order.estimatedDelivery)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Total</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{formatCurrency(order.total)}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        <section className="space-y-5">
          <div className="panel-card p-6">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Perfil</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">{customer.email}</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">{customer.phone}</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                {customer.documentType} {customer.documentNumber}
              </div>
            </div>
          </div>

          <div className="panel-card p-6">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Archivos visibles</h2>
            {visibleFiles.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">Aun no tienes entregables visibles en esta cuenta.</p>
            ) : (
              <div className="mt-5 space-y-3">
                {visibleFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-950">{file.name}</p>
                      <p className="text-sm text-slate-500">{file.size}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                      Descargar <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
