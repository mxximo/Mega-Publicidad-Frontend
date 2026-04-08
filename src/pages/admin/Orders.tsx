import { useMemo } from 'react';
import StatusBadge from '../../components/StatusBadge';
import { customers, orders } from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';

export default function Orders() {
  const customerMap = useMemo(
    () => new Map(customers.map((c) => [c.id, c])),
    [],
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="admin-kicker">Pedidos</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight admin-text">
          Control de ventas y solicitudes
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {['product', 'service', 'custom-design'].map((origin) => (
          <div key={origin} className="admin-panel p-6">
            <p className="admin-kicker">{origin}</p>
            <p className="mt-3 text-3xl font-black tracking-tight admin-text">
              {orders.filter((order) => order.origin === origin).length}
            </p>
          </div>
        ))}
      </div>

      <div className="admin-panel overflow-hidden">
        <div className="border-b border-[var(--admin-border)] px-6 py-5">
          <h2 className="text-xl font-black tracking-tight admin-text">Listado general</h2>
        </div>
        <div className="overflow-x-auto px-6 py-5">
          <table className="min-w-full text-left text-sm">
            <thead className="admin-table-head text-xs">
              <tr>
                <th className="pb-3">Tracking</th>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Origen</th>
                <th className="pb-3">Estado interno</th>
                <th className="pb-3">Estado cliente</th>
                <th className="pb-3">Entrega</th>
                <th className="pb-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {orders.map((order) => {
                const customer = customerMap.get(order.customerId);
                return (
                  <tr key={order.id}>
                    <td className="py-4 font-semibold admin-text">{order.trackingCode}</td>
                    <td className="py-4 admin-text-muted">{customer?.name}</td>
                    <td className="py-4 capitalize admin-text-muted">{order.origin}</td>
                    <td className="py-4">
                      <StatusBadge tone="warning">{order.internalStatus}</StatusBadge>
                    </td>
                    <td className="py-4">
                      <StatusBadge tone="info">{order.publicStatus}</StatusBadge>
                    </td>
                    <td className="py-4 admin-text-muted">
                      {formatDateTime(order.estimatedDelivery)}
                    </td>
                    <td className="py-4 font-semibold admin-text">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
