import { AlertTriangle, Boxes, BriefcaseBusiness, ReceiptText, Wallet } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import {
  creativeJobs,
  customers,
  inventoryItems,
  orders,
  payments,
} from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';

export default function Dashboard() {
  const salesToday = payments
    .filter(
      (payment) =>
        payment.createdAt.startsWith('2026-03-15') || payment.createdAt.startsWith('2026-03-16'),
    )
    .reduce((sum, payment) => sum + payment.amount, 0);
  const activeJobs = creativeJobs.filter((job) => job.status !== 'closed').length;
  const lowStock = inventoryItems.filter((item) => item.stock - item.reserved <= item.minimumStock).length;
  const pendingPayments = orders.filter((order) => order.paymentStatus !== 'paid').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
            Vista ejecutiva
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Dashboard general del negocio
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Resume ventas, produccion, clientes e inventario sobre el mismo dominio de datos.
          </p>
        </div>
        <StatusBadge tone="accent">MVP integrado</StatusBadge>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Ventas recientes"
          value={formatCurrency(salesToday)}
          hint="Pagos registrados entre ayer y hoy"
          icon={Wallet}
          tone="indigo"
        />
        <MetricCard
          label="Trabajos activos"
          value={String(activeJobs)}
          hint="Solicitudes en pipeline creativo"
          icon={BriefcaseBusiness}
          tone="emerald"
        />
        <MetricCard
          label="Clientes registrados"
          value={String(customers.length)}
          hint="Incluye frecuentes y ocasionales"
          icon={ReceiptText}
          tone="slate"
        />
        <MetricCard
          label="Alertas de inventario"
          value={String(lowStock)}
          hint={`${pendingPayments} pedidos con pago pendiente o parcial`}
          icon={Boxes}
          tone="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="panel-card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Pedidos recientes</h2>
            <StatusBadge tone="info">{orders.length} registros</StatusBadge>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="pb-3">Tracking</th>
                  <th className="pb-3">Origen</th>
                  <th className="pb-3">Estado cliente</th>
                  <th className="pb-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 font-semibold text-slate-950">{order.trackingCode}</td>
                    <td className="py-4 capitalize text-slate-500">{order.origin}</td>
                    <td className="py-4">
                      <StatusBadge tone="info">{order.publicStatus}</StatusBadge>
                    </td>
                    <td className="py-4 font-semibold text-slate-950">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel-card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Atencion inmediata</h2>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-5 space-y-4">
            {creativeJobs.map((job) => (
              <div key={job.id} className="rounded-[24px] bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{job.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Entrega {formatDateTime(job.dueDate)}
                    </p>
                  </div>
                  <StatusBadge tone={job.priority === 'high' ? 'danger' : 'warning'}>
                    {job.priority}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
