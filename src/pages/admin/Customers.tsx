import StatusBadge from '../../components/StatusBadge';
import { creativeJobs, customers, orders } from '../../data/mockData';

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <p className="admin-kicker">Clientes</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight admin-text">
          CRM mixto para frecuentes y ocasionales
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="admin-panel p-6">
          <p className="text-sm admin-text-muted">Clientes frecuentes</p>
          <p className="mt-2 text-3xl font-black tracking-tight admin-text">
            {customers.filter((customer) => customer.kind === 'account').length}
          </p>
        </div>
        <div className="admin-panel p-6">
          <p className="text-sm admin-text-muted">Clientes ocasionales</p>
          <p className="mt-2 text-3xl font-black tracking-tight admin-text">
            {customers.filter((customer) => customer.kind === 'guest').length}
          </p>
        </div>
        <div className="admin-panel p-6">
          <p className="text-sm admin-text-muted">Pedidos activos</p>
          <p className="mt-2 text-3xl font-black tracking-tight admin-text">{orders.length}</p>
        </div>
        <div className="admin-panel p-6">
          <p className="text-sm admin-text-muted">Trabajos creativos</p>
          <p className="mt-2 text-3xl font-black tracking-tight admin-text">
            {creativeJobs.length}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {customers.map((customer) => {
          const customerOrders = orders.filter((order) => order.customerId === customer.id);
          const customerJobs = creativeJobs.filter((job) => job.customerId === customer.id);

          return (
            <article key={customer.id} className="admin-panel p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black tracking-tight admin-text">
                    {customer.name}
                  </h2>
                  <p className="mt-2 text-sm admin-text-muted">{customer.email}</p>
                </div>
                <StatusBadge tone={customer.kind === 'account' ? 'success' : 'neutral'}>
                  {customer.kind === 'account' ? 'Cuenta frecuente' : 'Ocasional'}
                </StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="admin-surface-soft rounded-lg px-4 py-3 text-sm admin-text-muted">
                  {customer.documentType} {customer.documentNumber}
                </div>
                <div className="admin-surface-soft rounded-lg px-4 py-3 text-sm admin-text-muted">
                  {customerOrders.length} pedidos
                </div>
                <div className="admin-surface-soft rounded-lg px-4 py-3 text-sm admin-text-muted">
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
