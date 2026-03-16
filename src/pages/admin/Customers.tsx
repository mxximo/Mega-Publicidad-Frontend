import StatusBadge from '../../components/StatusBadge';
import { creativeJobs, customers, orders } from '../../data/mockData';

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Clientes</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          CRM mixto para frecuentes y ocasionales
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="panel-card p-6">
          <p className="text-sm text-slate-500">Clientes frecuentes</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            {customers.filter((customer) => customer.kind === 'account').length}
          </p>
        </div>
        <div className="panel-card p-6">
          <p className="text-sm text-slate-500">Clientes ocasionales</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            {customers.filter((customer) => customer.kind === 'guest').length}
          </p>
        </div>
        <div className="panel-card p-6">
          <p className="text-sm text-slate-500">Pedidos activos</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{orders.length}</p>
        </div>
        <div className="panel-card p-6">
          <p className="text-sm text-slate-500">Trabajos creativos</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            {creativeJobs.length}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {customers.map((customer) => {
          const customerOrders = orders.filter((order) => order.customerId === customer.id);
          const customerJobs = creativeJobs.filter((job) => job.customerId === customer.id);

          return (
            <article key={customer.id} className="panel-card p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    {customer.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">{customer.email}</p>
                </div>
                <StatusBadge tone={customer.kind === 'account' ? 'success' : 'neutral'}>
                  {customer.kind === 'account' ? 'Cuenta frecuente' : 'Ocasional'}
                </StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {customer.documentType} {customer.documentNumber}
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {customerOrders.length} pedidos
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {customerJobs.length} trabajos
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
