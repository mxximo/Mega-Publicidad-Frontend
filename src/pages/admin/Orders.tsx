import StatusBadge from '../../components/StatusBadge';
import { customers, orders } from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Pedidos</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          Control de ventas y solicitudes
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {['product', 'service', 'custom-design'].map((origin) => (
          <div key={origin} className="panel-card p-6">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              {origin}
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              {orders.filter((order) => order.origin === origin).length}
            </p>
          </div>
        ))}
      </div>

      <div className="panel-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950">Listado general</h2>
        </div>
        <div className="overflow-x-auto px-6 py-5">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
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
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const customer = customers.find((candidate) => candidate.id === order.customerId);
                return (
                  <tr key={order.id}>
                    <td className="py-4 font-semibold text-slate-950">{order.trackingCode}</td>
                    <td className="py-4 text-slate-600">{customer?.name}</td>
                    <td className="py-4 capitalize text-slate-600">{order.origin}</td>
                    <td className="py-4">
                      <StatusBadge tone="warning">{order.internalStatus}</StatusBadge>
                    </td>
                    <td className="py-4">
                      <StatusBadge tone="info">{order.publicStatus}</StatusBadge>
                    </td>
                    <td className="py-4 text-slate-600">
                      {formatDateTime(order.estimatedDelivery)}
                    </td>
                    <td className="py-4 font-semibold text-slate-950">
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
