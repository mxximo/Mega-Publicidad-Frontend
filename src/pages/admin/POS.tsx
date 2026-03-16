import { useMemo, useState } from 'react';
import { CreditCard, Minus, Plus, Search, Wallet } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { cashSessions, customers, products, services } from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';

type CatalogItem = {
  id: string;
  label: string;
  price: number;
  kind: 'product' | 'service';
  category: string;
};

export default function POS() {
  const catalog: CatalogItem[] = useMemo(
    () => [
      ...products.map((product) => ({
        id: product.id,
        label: product.name,
        price: product.price,
        kind: 'product' as const,
        category: product.category,
      })),
      ...services.map((service) => ({
        id: service.id,
        label: service.name,
        price: service.priceFrom,
        kind: 'service' as const,
        category: service.category,
      })),
    ],
    [],
  );

  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CatalogItem[]>(catalog.slice(0, 2));
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id ?? '');

  const filteredCatalog = catalog.filter((item) =>
    item.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const cartGrouped = cart.reduce<Record<string, { item: CatalogItem; quantity: number }>>(
    (accumulator, item) => {
      accumulator[item.id] = accumulator[item.id]
        ? {
            item,
            quantity: accumulator[item.id].quantity + 1,
          }
        : { item, quantity: 1 };

      return accumulator;
    },
    {},
  );

  const lines: { item: CatalogItem; quantity: number }[] = Object.values(cartGrouped);
  const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const tax = subtotal * 0.19;
  const total = subtotal + tax;
  const activeCashSession = cashSessions[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="panel-card overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar productos o servicios"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          {filteredCatalog.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCart((current) => [...current, item])}
              className="rounded-[28px] border border-slate-200 bg-white p-5 text-left transition hover:border-[var(--brand)] hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-3">
                <StatusBadge tone={item.kind === 'product' ? 'warning' : 'info'}>
                  {item.kind}
                </StatusBadge>
                <span className="text-sm font-semibold text-slate-500">{item.category}</span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-950">{item.label}</h2>
              <p className="mt-4 text-xl font-black tracking-tight text-slate-950">
                {formatCurrency(item.price)}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="panel-card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Cliente y caja</h2>
            <StatusBadge tone="success">{activeCashSession.status}</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Cliente</span>
              <select
                value={selectedCustomerId}
                onChange={(event) => setSelectedCustomerId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} · {customer.kind}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-[28px] bg-slate-50 p-4 text-sm text-slate-600">
              Apertura {formatCurrency(activeCashSession.openingAmount)} · iniciada{' '}
              {formatDateTime(activeCashSession.openedAt)}
            </div>
          </div>
        </div>

        <div className="panel-card p-6">
          <h2 className="text-xl font-black tracking-tight text-slate-950">Resumen del pedido</h2>
          <div className="mt-5 space-y-3">
            {lines.map((line) => (
              <div key={line.item.id} className="rounded-[24px] border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{line.item.label}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatCurrency(line.item.price)} por unidad
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setCart((current) => {
                          const index = current.findIndex((item) => item.id === line.item.id);
                          if (index < 0) {
                            return current;
                          }
                          return current.filter((_, itemIndex) => itemIndex !== index);
                        })
                      }
                      className="rounded-full p-1 text-slate-600"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold text-slate-900">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setCart((current) => [...current, line.item])}
                      className="rounded-full p-1 text-slate-600"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-black tracking-tight text-slate-950">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              <Wallet className="h-4 w-4" /> Cobrar efectivo
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white">
              <CreditCard className="h-4 w-4" /> Cobrar tarjeta
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
