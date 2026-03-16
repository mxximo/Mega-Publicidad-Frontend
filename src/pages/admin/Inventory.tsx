import StatusBadge from '../../components/StatusBadge';
import { inventoryItems } from '../../data/mockData';
import { formatDateTime } from '../../lib/format';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Inventario</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          Stock base y material comprometido
        </h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        {inventoryItems.map((item) => {
          const available = item.stock - item.reserved;
          const isLow = available <= item.minimumStock;

          return (
            <article key={item.id} className="panel-card p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.sku}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    {item.name}
                  </h2>
                </div>
                <StatusBadge tone={isLow ? 'danger' : 'success'}>
                  {isLow ? 'Reposicion urgente' : 'Stock sano'}
                </StatusBadge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {item.stock} stock
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {item.reserved} reservado
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {available} disponible
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-500">
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
