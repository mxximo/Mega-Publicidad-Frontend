import PublicBadge from '../../components/public/PublicBadge';
import PublicCard from '../../components/public/PublicCard';
import PublicSection from '../../components/public/PublicSection';
import SectionHeading from '../../components/public/SectionHeading';
import { services } from '../../data/mockData';
import { formatCurrency } from '../../lib/format';

export default function Services() {
  return (
    <div className="overflow-hidden">
      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-violet" />
          <div className="flex flex-col gap-8">
            <SectionHeading
              kicker="Servicios estandar"
              title="Servicios creativos con alcance controlado"
              description="Se venden como un flujo diferente a los productos fisicos y a los proyectos personalizados."
            />
            <div className="space-y-5">
              {services.map((service) => (
                <PublicCard
                  key={service.id}
                  className="grid gap-6 p-6 lg:grid-cols-[1fr_0.35fr] lg:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <PublicBadge tone="info">{service.category}</PublicBadge>
                      <PublicBadge tone="warning">{service.turnaround}</PublicBadge>
                    </div>
                    <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--public-text)]">
                      {service.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                      {service.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--public-line)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs font-medium text-[var(--public-text-muted)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-[rgba(124,91,250,0.22)] bg-[var(--public-surface-strong)] p-6">
                    <p className="text-sm text-[var(--public-text-muted)]">Precio base</p>
                    <p className="mt-2 text-3xl font-black tracking-tight text-white">
                      {formatCurrency(service.priceFrom)}
                    </p>
                    <p className="mt-4 text-sm text-[var(--public-text-muted)]">
                      Ideal para pedidos repetibles con entregables definidos y tiempos cortos.
                    </p>
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
