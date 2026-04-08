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

  const filteredCatalog = useMemo(
    () =>
      catalog.filter((item) =>
        item.label.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [catalog, search],
  );

  const cartGrouped = useMemo(
    () =>
      cart.reduce<Record<string, { item: CatalogItem; quantity: number }>>(
        (accumulator, item) => {
          accumulator[item.id] = accumulator[item.id]
            ? { item, quantity: accumulator[item.id].quantity + 1 }
            : { item, quantity: 1 };
          return accumulator;
        },
        {},
      ),
    [cart],
  );

  const lines: { item: CatalogItem; quantity: number }[] = Object.values(cartGrouped);
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
    [lines],
  );
  const tax = subtotal * 0.19;
  const total = subtotal + tax;
  const activeCashSession = cashSessions[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="admin-panel overflow-hidden">
        <div className="border-b border-[var(--admin-border)] bg-[var(--admin-surface2)] p-5">
          <div className="admin-input flex items-center gap-3 !rounded-lg !py-2.5">
            <Search className="h-4 w-4 text-[var(--admin-ink3)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar productos o servicios"
              className="w-full bg-transparent text-sm text-[var(--admin-ink)] outline-none placeholder:text-[var(--admin-ink3)]"
            />
          </div>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          {filteredCatalog.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCart((current) => [...current, item])}
              className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 text-left transition hover:border-[var(--admin-accent)] hover:bg-[var(--admin-surface2)]"
            >
              <div className="flex items-start justify-between gap-3">
                <StatusBadge tone={item.kind === 'product' ? 'warning' : 'info'}>
                  {item.kind}
                </StatusBadge>
                <span className="text-sm font-semibold admin-text-muted">{item.category}</span>
              </div>
              <h2 className="mt-4 text-lg font-bold admin-text">{item.label}</h2>
              <p className="mt-4 text-xl font-black tracking-tight admin-text">
                {formatCurrency(item.price)}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="admin-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight admin-text">Cliente y caja</h2>
            <StatusBadge tone="success">{activeCashSession.status}</StatusBadge>
          </div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium admin-text-muted">Cliente</span>
              <select
                value={selectedCustomerId}
                onChange={(event) => setSelectedCustomerId(event.target.value)}
                className="admin-input mt-2 !rounded-lg"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} · {customer.kind}
                  </option>
                ))}
              </select>
            </label>
            <div className="admin-panel-soft rounded-lg p-4 text-sm admin-text-muted">
              Apertura {formatCurrency(activeCashSession.openingAmount)} · iniciada{' '}
              {formatDateTime(activeCashSession.openedAt)}
            </div>
          </div>
        </div>

        <div className="admin-panel p-6">
          <h2 className="text-xl font-black tracking-tight admin-text">Resumen del pedido</h2>
          <div className="mt-5 space-y-3">
            {lines.map((line) => (
              <div key={line.item.id} className="rounded-lg border border-[var(--admin-border)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold admin-text">{line.item.label}</p>
                    <p className="mt-1 text-sm admin-text-muted">
                      {formatCurrency(line.item.price)} por unidad
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-[var(--admin-surface2)] px-2 py-1">
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
                      className="rounded-full p-1 admin-text-muted"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold admin-text">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setCart((current) => [...current, line.item])}
                      className="rounded-full p-1 admin-text-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-[var(--admin-border)] pt-5 text-sm admin-text-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-black tracking-tight admin-text">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button className="admin-outline-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold">
              <Wallet className="h-4 w-4" /> Cobrar efectivo
            </button>
            <button className="admin-primary-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold">
              <CreditCard className="h-4 w-4" /> Cobrar tarjeta
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
