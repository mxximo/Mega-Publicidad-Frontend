import { Link } from 'react-router-dom';
import { products } from '../../data/mockData';
import { formatCurrency } from '../../lib/format';
import StatusBadge from '../../components/StatusBadge';

export default function Catalog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
            Catalogo de productos
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Impresion, merchandising y gran formato
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-500">
            Este MVP diferencia productos fisicos de servicios y trabajos personalizados para que la
            operacion comercial no mezcle flujos.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white"
        >
          Pedir cotizacion comercial
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="panel-card overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <StatusBadge tone={product.stock > 25 ? 'success' : 'warning'}>
                  {product.stock > 25 ? 'Disponible' : 'Stock ajustado'}
                </StatusBadge>
                <span className="text-xs font-medium text-slate-500">{product.sku}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">{product.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-black text-slate-950">{formatCurrency(product.price)}</span>
                <span className="text-sm text-slate-500">{product.unit}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
