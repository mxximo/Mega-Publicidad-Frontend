import { useMemo, useState } from 'react';
import { Link2, PackageSearch, ShieldCheck } from 'lucide-react';
import {
  creativeJobs,
  getCustomerById,
  getOrderByTracking,
} from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';

const demoLookups = ['GP-24031', 'trk-maria-24032', 'GP-24033'];

const publicStatusLabels = {
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
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="panel-card overflow-hidden">
        <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
          <StatusBadge tone="accent" className="border-0 bg-white/10 text-white">
            Seguimiento abierto para clientes ocasionales y frecuentes
          </StatusBadge>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Consulta el estado visible de tu pedido
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
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
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-4">
                <Link2 className="h-5 w-5 text-slate-300" />
                <input
                  value={trackingTerm}
                  onChange={(event) => setTrackingTerm(event.target.value)}
                  placeholder="Ej. GP-24031 o trk-maria-24032"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                />
              </div>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-4 text-sm font-bold text-white transition hover:bg-[var(--brand-dark)]"
            >
              Consultar <PackageSearch className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-300">
            {demoLookups.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setTrackingTerm(code);
                  setSubmittedTerm(code);
                }}
                className="rounded-full border border-white/10 px-3 py-1.5 transition hover:bg-white/10"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {!submittedTerm ? (
            <EmptyState
              title="Aun no has consultado un pedido"
              description="Ingresa un codigo o usa uno de los accesos rapidos para ver el tracking publico del pedido."
            />
          ) : !order || !customer ? (
            <EmptyState
              title="No encontramos un pedido con ese dato"
              description="Verifica el codigo de seguimiento o el token del enlace unico. El rastreo diferencia estados internos y visibles al cliente."
            />
          ) : (
            <div className="space-y-8">
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[28px] bg-slate-50 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Pedido {order.trackingCode}</p>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                        {order.lineItems[0]?.name}
                      </h2>
                    </div>
                    <StatusBadge tone="info">{publicStatusLabels[order.publicStatus]}</StatusBadge>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Cliente</p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">{customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                        Entrega estimada
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">
                        {formatDateTime(order.estimatedDelivery)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Total</p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">Vista segura para cliente</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        No mostramos observaciones internas, reasignaciones ni notas de produccion.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span>Origen del pedido</span>
                      <span className="font-semibold capitalize">{order.origin}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span>Entrega</span>
                      <span className="font-semibold capitalize">{order.deliveryType}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span>Seguimiento</span>
                      <span className="font-semibold">{order.trackingLinkToken}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
                <div className="panel-card p-6">
                  <h3 className="text-lg font-bold text-slate-950">Historial visible</h3>
                  <div className="mt-6 space-y-5">
                    {order.visibleHistory.map((event) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="mt-1 h-3 w-3 rounded-full bg-[var(--brand)]" />
                        <div>
                          <p className="font-semibold text-slate-950">{event.publicLabel}</p>
                          <p className="mt-1 text-sm text-slate-500">{formatDateTime(event.at)}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                            Registrado por {event.actor}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel-card p-6">
                  <h3 className="text-lg font-bold text-slate-950">Entregables disponibles</h3>
                  {visibleFiles.length === 0 ? (
                    <div className="mt-6 rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                      Aun no hay archivos finales visibles para este pedido. Si eres cliente frecuente,
                      tambien puedes entrar a tu area privada para ver tu historial completo.
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {visibleFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold text-slate-950">{file.name}</p>
                            <p className="text-sm text-slate-500">{file.size}</p>
                          </div>
                          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                            Descargar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
