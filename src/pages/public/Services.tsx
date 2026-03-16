import { services } from '../../data/mockData';
import { formatCurrency } from '../../lib/format';
import StatusBadge from '../../components/StatusBadge';

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
          Servicios estandar
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          Servicios creativos con alcance controlado
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-500">
          Se venden como un flujo diferente a los productos fisicos y a los proyectos personalizados.
        </p>
      </div>
      <div className="space-y-5">
        {services.map((service) => (
          <article
            key={service.id}
            className="panel-card grid gap-6 p-6 lg:grid-cols-[1fr_0.35fr] lg:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge tone="info">{service.category}</StatusBadge>
                <StatusBadge tone="warning">{service.turnaround}</StatusBadge>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                {service.name}
              </h2>
              <p className="mt-3 text-sm text-slate-500">{service.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-slate-950 p-6 text-white">
              <p className="text-sm text-slate-300">Precio base</p>
              <p className="mt-2 text-3xl font-black tracking-tight">
                {formatCurrency(service.priceFrom)}
              </p>
              <p className="mt-4 text-sm text-slate-300">
                Ideal para pedidos repetibles con entregables definidos y tiempos cortos.
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
