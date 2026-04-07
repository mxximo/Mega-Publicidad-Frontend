import { useMemo, useState } from 'react';
import { Link2, PackageSearch, ShieldCheck } from 'lucide-react';
import {
  creativeJobs,
  getCustomerById,
  getOrderByTracking,
} from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';
import PublicBadge from '../../components/public/PublicBadge';
import PublicCard from '../../components/public/PublicCard';
import PublicEmptyState from '../../components/public/PublicEmptyState';
import PublicSection from '../../components/public/PublicSection';

const demoLookups = ['GP-24031', 'trk-maria-24032', 'GP-24033'];

const publicStatusLabels: Record<string, string> = {
  received: 'Recibido',
  scheduled: 'Programado',
  in_design: 'En desarrollo',
  in_review: 'En revision',
  ready_for_delivery: 'Listo para entrega',
  completed: 'Completado',
};

export default function TrackOrder() {
  const [trackingTerm, setTrackingTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');

  const order = useMemo(() => getOrderByTracking(submittedTerm), [submittedTerm]);
  const customer = order ? getCustomerById(order.customerId) : null;
  const visibleFiles = order?.assignedJobId
    ? creativeJobs
        .find((job) => job.id === order.assignedJobId)
        ?.files.filter((file) => file.visibleToCustomer) ?? []
    : [];

  return (
    <div className="overflow-hidden">
      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-violet" />

          {/* Search header */}
          <div className="p-6 sm:p-8">
            <PublicBadge tone="accent">
              Seguimiento abierto para clientes ocasionales y frecuentes
            </PublicBadge>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[var(--public-text)] sm:text-4xl">
              Consulta el estado visible de tu pedido
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--public-text-muted)] sm:text-base">
              Usa tu codigo de seguimiento o el enlace unico recibido. El sistema muestra solo el
              estado publico y los entregables autorizados para cliente.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmittedTerm(trackingTerm);
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <label className="flex-1">
                <span className="sr-only">Codigo o enlace</span>
                <div className="flex items-center gap-3 rounded-full border border-[var(--public-line)] bg-[rgba(11,18,32,0.78)] px-5 py-4">
                  <Link2 className="h-5 w-5 text-[var(--public-text-muted)]" />
                  <input
                    value={trackingTerm}
                    onChange={(event) => setTrackingTerm(event.target.value)}
                    placeholder="Ej. GP-24031 o trk-maria-24032"
                    className="w-full bg-transparent text-sm text-[var(--public-text)] outline-none placeholder:text-[rgba(168,180,207,0.68)]"
                  />
                </div>
              </label>
              <button
                type="submit"
                className="public-button public-button-primary"
              >
                Consultar <PackageSearch className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--public-text-muted)]">
              {demoLookups.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setTrackingTerm(code);
                    setSubmittedTerm(code);
                  }}
                  className="rounded-full border border-[var(--public-line)] px-3 py-1.5 transition hover:border-[rgba(103,232,249,0.24)] hover:bg-[rgba(255,255,255,0.06)]"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="public-divider mx-6" />

          {/* Results */}
          <div className="p-6 sm:p-8">
            {!submittedTerm ? (
              <PublicEmptyState
                title="Aun no has consultado un pedido"
                description="Ingresa un codigo o usa uno de los accesos rapidos para ver el tracking publico del pedido."
              />
            ) : !order || !customer ? (
              <PublicEmptyState
                title="No encontramos un pedido con ese dato"
                description="Verifica el codigo de seguimiento o el token del enlace unico. El rastreo diferencia estados internos y visibles al cliente."
              />
            ) : (
              <div className="space-y-8">
                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <PublicCard className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-[var(--public-text-muted)]">
                          Pedido {order.trackingCode}
                        </p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--public-text)]">
                          {order.lineItems[0]?.name}
                        </h2>
                      </div>
                      <PublicBadge tone="info">
                        {publicStatusLabels[order.publicStatus]}
                      </PublicBadge>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {[
                        { label: 'Cliente', value: customer.name },
                        { label: 'Entrega estimada', value: formatDateTime(order.estimatedDelivery) },
                        { label: 'Total', value: formatCurrency(order.total) },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--public-accent)]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[var(--public-text)]">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </PublicCard>

                  <PublicCard className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-[rgba(52,211,153,0.12)] p-3 text-[#6ee7b7]">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--public-text)]">
                          Vista segura para cliente
                        </h3>
                        <p className="mt-2 text-sm text-[var(--public-text-muted)]">
                          No mostramos observaciones internas, reasignaciones ni notas de produccion.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-[var(--public-text-muted)]">
                      {[
                        { label: 'Origen del pedido', value: order.origin },
                        { label: 'Entrega', value: order.deliveryType },
                        { label: 'Seguimiento', value: order.trackingLinkToken },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between rounded-2xl bg-[var(--public-surface-muted)] px-4 py-3"
                        >
                          <span>{row.label}</span>
                          <span className="font-semibold capitalize text-[var(--public-text)]">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </PublicCard>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
                  <PublicCard className="p-6">
                    <h3 className="text-lg font-bold text-[var(--public-text)]">Historial visible</h3>
                    <div className="mt-6 space-y-5">
                      {order.visibleHistory.map((event) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--public-accent)]" />
                          <div>
                            <p className="font-semibold text-[var(--public-text)]">
                              {event.publicLabel}
                            </p>
                            <p className="mt-1 text-sm text-[var(--public-text-muted)]">
                              {formatDateTime(event.at)}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--public-text-muted)]">
                              Registrado por {event.actor}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PublicCard>

                  <PublicCard className="p-6">
                    <h3 className="text-lg font-bold text-[var(--public-text)]">
                      Entregables disponibles
                    </h3>
                    {visibleFiles.length === 0 ? (
                      <div className="mt-6 rounded-[20px] border border-dashed border-[var(--public-line)] bg-[var(--public-surface-muted)] p-6 text-sm text-[var(--public-text-muted)]">
                        Aun no hay archivos finales visibles para este pedido. Si eres cliente
                        frecuente, tambien puedes entrar a tu area privada para ver tu historial
                        completo.
                      </div>
                    ) : (
                      <div className="mt-5 space-y-3">
                        {visibleFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between rounded-2xl border border-[var(--public-line)] px-4 py-3"
                          >
                            <div>
                              <p className="font-semibold text-[var(--public-text)]">{file.name}</p>
                              <p className="text-sm text-[var(--public-text-muted)]">{file.size}</p>
                            </div>
                            <button className="rounded-full border border-[var(--public-line)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-semibold text-[var(--public-text)] transition hover:border-[rgba(103,232,249,0.24)]">
                              Descargar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </PublicCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </PublicSection>
    </div>
  );
}
