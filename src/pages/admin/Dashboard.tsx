import { AlertTriangle, Boxes, BriefcaseBusiness, ReceiptText, Wallet } from 'lucide-react';
import { useMemo } from 'react';
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
  const salesToday = useMemo(
    () =>
      payments
        .filter(
          (payment) =>
            payment.createdAt.startsWith('2026-03-15') || payment.createdAt.startsWith('2026-03-16'),
        )
        .reduce((sum, payment) => sum + payment.amount, 0),
    [],
  );
  const activeJobs = useMemo(
    () => creativeJobs.filter((job) => job.status !== 'closed').length,
    [],
  );
  const lowStock = useMemo(
    () => inventoryItems.filter((item) => item.stock - item.reserved <= item.minimumStock).length,
    [],
  );
  const pendingPayments = useMemo(
    () => orders.filter((order) => order.paymentStatus !== 'paid').length,
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="admin-kicker">Vista ejecutiva</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight admin-text">
            Dashboard general del negocio
          </h1>
          <p className="mt-3 text-sm admin-text-muted">
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
        <section className="admin-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight admin-text">Pedidos recientes</h2>
            <StatusBadge tone="info">{orders.length} registros</StatusBadge>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="admin-table-head text-xs">
                <tr>
                  <th className="pb-3">Tracking</th>
                  <th className="pb-3">Origen</th>
                  <th className="pb-3">Estado cliente</th>
                  <th className="pb-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--admin-border)]">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 font-semibold admin-text">{order.trackingCode}</td>
                    <td className="py-4 capitalize admin-text-muted">{order.origin}</td>
                    <td className="py-4">
                      <StatusBadge tone="info">{order.publicStatus}</StatusBadge>
                    </td>
                    <td className="py-4 font-semibold admin-text">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight admin-text">Atencion inmediata</h2>
            <AlertTriangle className="h-5 w-5 text-[var(--admin-amber)]" />
          </div>
          <div className="mt-5 space-y-4">
            {creativeJobs.map((job) => (
              <div key={job.id} className="admin-panel-soft rounded-lg p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold admin-text">{job.title}</p>
                    <p className="mt-1 text-sm admin-text-muted">
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
