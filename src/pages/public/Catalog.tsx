import PublicBadge from '../../components/public/PublicBadge';
import PublicButton from '../../components/public/PublicButton';
import PublicCard from '../../components/public/PublicCard';
import PublicSection from '../../components/public/PublicSection';
import SectionHeading from '../../components/public/SectionHeading';
import { products } from '../../data/mockData';
import { formatCurrency } from '../../lib/format';

export default function Catalog() {
  return (
    <div className="overflow-hidden">
      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-cyan" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                kicker="Catalogo de productos"
                title="Impresion, merchandising y gran formato"
                description="Productos fisicos listos para compra, cotizacion y entrega. Diferenciados de servicios y trabajos personalizados."
              />
              <PublicButton to="/contact" variant="secondary">
                Pedir cotizacion comercial
              </PublicButton>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <PublicCard key={product.id} className="overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover opacity-84 transition duration-300 hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,17,31,0.95)] via-[rgba(9,17,31,0.1)] to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <PublicBadge tone={product.stock > 25 ? 'success' : 'warning'}>
                        {product.stock > 25 ? 'Disponible' : 'Stock ajustado'}
                      </PublicBadge>
                      <span className="text-xs font-medium text-[var(--public-text-muted)]">
                        {product.sku}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-[var(--public-text)]">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--public-text-muted)]">
                      {product.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-lg font-black text-white">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-sm text-[var(--public-text-muted)]">{product.unit}</span>
                    </div>
                  </div>
                </PublicCard>
              ))}
            </div>
          </div>
        </div>
      </PublicSection>
    </div>
  );
}
