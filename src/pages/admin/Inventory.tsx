import StatusBadge from '../../components/StatusBadge';
import { inventoryItems } from '../../data/mockData';
import { formatDateTime } from '../../lib/format';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <p className="admin-kicker">Inventario</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight admin-text">
          Stock base y material comprometido
        </h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        {inventoryItems.map((item) => {
          const available = item.stock - item.reserved;
          const isLow = available <= item.minimumStock;

          return (
            <article key={item.id} className="admin-panel p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium admin-text-muted">{item.sku}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight admin-text">
                    {item.name}
                  </h2>
                </div>
                <StatusBadge tone={isLow ? 'danger' : 'success'}>
                  {isLow ? 'Reposicion urgente' : 'Stock sano'}
                </StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="admin-surface-soft rounded-lg px-4 py-3 text-sm admin-text-muted">
                  {item.stock} stock
                </div>
                <div className="admin-surface-soft rounded-lg px-4 py-3 text-sm admin-text-muted">
                  {item.reserved} reservado
                </div>
                <div className="admin-surface-soft rounded-lg px-4 py-3 text-sm admin-text-muted">
                  {available} disponible
                </div>
              </div>
              <p className="mt-5 text-sm admin-text-muted">
                Minimo {item.minimumStock} · {item.location} · actualizado{' '}
                {formatDateTime(item.updatedAt)}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
