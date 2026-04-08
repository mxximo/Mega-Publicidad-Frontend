import { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Clock3,
  FileText,
  Paperclip,
  X,
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { creativeJobs, customers, internalUsers } from '../../data/mockData';
import { formatDateTime } from '../../lib/format';
import type { CreativeJob, CreativeJobStatus } from '../../types/domain';

const columns: {
  id: CreativeJobStatus;
  title: string;
  tone: 'neutral' | 'info' | 'warning' | 'accent' | 'success';
  color: string;
}[] = [
  { id: 'requested',  title: 'Solicitud',  tone: 'neutral',  color: 'var(--admin-text-faint)' },
  { id: 'assigned',   title: 'Asignado',   tone: 'accent',   color: 'var(--admin-accent)' },
  { id: 'in_progress',title: 'En proceso', tone: 'info',     color: '#60a5fa' },
  { id: 'review',     title: 'Revisión',   tone: 'warning',  color: '#f59e0b' },
  { id: 'delivery',   title: 'Entrega',    tone: 'info',     color: '#34d399' },
  { id: 'closed',     title: 'Cierre',     tone: 'success',  color: '#10b981' },
];

const nextStatusMap: Partial<Record<CreativeJobStatus, CreativeJobStatus>> = {
  requested: 'assigned',
  assigned: 'in_progress',
  in_progress: 'review',
  review: 'delivery',
  delivery: 'closed',
};

export default function ProductionBoard() {
  const { hasPermission, user } = useAuth();
  const [jobs, setJobs] = useState<CreativeJob[]>(creativeJobs);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const visibleJobs = useMemo(() => {
    if (!user || !('role' in user)) return [];
    return user.role === 'designer' ? jobs.filter((job) => job.designerId === user.id) : jobs;
  }, [jobs, user]);

  const selectedJob = useMemo(
    () => (selectedJobId ? visibleJobs.find((job) => job.id === selectedJobId) ?? null : null),
    [visibleJobs, selectedJobId],
  );

  const designers = useMemo(
    () => internalUsers.filter((candidate) => candidate.role === 'designer'),
    [],
  );

  const customerMap = useMemo(() => new Map(customers.map((c) => [c.id, c])), []);
  const userMap = useMemo(() => new Map(internalUsers.map((u) => [u.id, u])), []);

  const jobsByColumn = useMemo(() => {
    const map = new Map<CreativeJobStatus, typeof visibleJobs>();
    for (const col of columns) map.set(col.id, []);
    for (const job of visibleJobs) {
      const list = map.get(job.status);
      if (list) list.push(job);
    }
    return map;
  }, [visibleJobs]);

  const openDetail = (id: string) => setSelectedJobId(id);
  const closeDetail = () => setSelectedJobId(null);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Board ─────────────────────────────────────────────────────── */}
      <section className="admin-panel min-w-0 overflow-hidden p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="admin-kicker">Produccion creativa</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight admin-text sm:text-3xl">
              {user && 'role' in user && user.role === 'designer'
                ? 'Mis trabajos asignados'
                : 'Tablero operativo'}
            </h1>
          </div>
          <StatusBadge tone="accent">
            {hasPermission('production.assign')
              ? 'Puede asignar y reasignar'
              : 'Puede actualizar avances'}
          </StatusBadge>
        </div>

        {/* Column header legend */}
        <div className="mb-3 hidden gap-2 lg:flex">
          {columns.map((col) => {
            const count = jobsByColumn.get(col.id)?.length ?? 0;
            return (
              <div key={col.id} className="flex-1 min-w-0">
                <div
                  className="h-0.5 w-full rounded-full mb-2"
                  style={{ backgroundColor: col.color }}
                />
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-xs font-bold uppercase tracking-widest admin-text-muted truncate">
                    {col.title}
                  </span>
                  <span
                    className="text-xs font-black tabular-nums"
                    style={{ color: col.color }}
                  >
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban columns */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
            {columns.map((column) => (
              <div
                key={column.id}
                className="admin-panel-soft w-52 shrink-0 rounded-xl p-3"
              >
                {/* Mobile column header (visible below lg) */}
                <div className="mb-3 flex items-center justify-between gap-2 lg:hidden">
                  <StatusBadge tone={column.tone}>{column.title}</StatusBadge>
                  <span className="admin-text-faint text-xs font-bold">
                    {jobsByColumn.get(column.id)?.length ?? 0}
                  </span>
                </div>

                <div className="space-y-2">
                  {(jobsByColumn.get(column.id) ?? []).map((job) => {
                    const customer = customerMap.get(job.customerId);
                    const isSelected = selectedJobId === job.id;
                    return (
                      <button
                        key={job.id}
                        type="button"
                        onClick={() => openDetail(job.id)}
                        className={`w-full rounded-lg border p-3 text-left transition-all ${
                          isSelected
                            ? 'border-[var(--admin-accent)] bg-[var(--admin-surface)] shadow-md'
                            : 'border-[var(--admin-border)] bg-[var(--admin-surface)] hover:border-[var(--admin-border2)] hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <StatusBadge
                            tone={
                              job.priority === 'high'
                                ? 'danger'
                                : job.priority === 'medium'
                                  ? 'warning'
                                  : 'neutral'
                            }
                          >
                            {job.priority}
                          </StatusBadge>
                          <span className="admin-text-faint text-[10px] font-medium tabular-nums">
                            {job.id}
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-bold leading-snug admin-text line-clamp-2">
                          {job.title}
                        </p>
                        <p className="mt-1 text-xs admin-text-muted truncate">{customer?.name}</p>
                        <p className="mt-3 admin-text-faint text-[10px] uppercase tracking-[0.15em]">
                          Vence {formatDateTime(job.dueDate)}
                        </p>
                      </button>
                    );
                  })}

                  {(jobsByColumn.get(column.id) ?? []).length === 0 && (
                    <div className="rounded-lg border border-dashed border-[var(--admin-border)] py-6 text-center">
                      <p className="text-xs admin-text-faint">Sin trabajos</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detail Drawer ─────────────────────────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeDetail}
          />

          {/* Panel */}
          <div className="relative z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto shadow-2xl admin-panel">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--admin-border)] bg-[var(--admin-panel)] px-6 py-5">
              <div className="min-w-0">
                <p className="text-xs font-medium admin-text-muted">{selectedJob.id}</p>
                <h2 className="mt-1 text-xl font-black tracking-tight leading-snug admin-text">
                  {selectedJob.title}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge tone="info">{selectedJob.status}</StatusBadge>
                <button
                  type="button"
                  onClick={closeDetail}
                  className="rounded-lg border border-[var(--admin-border)] p-1.5 transition hover:bg-[var(--admin-surface2)] admin-text-faint"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 px-6 py-6">
              {/* Meta */}
              <div className="space-y-2 text-sm admin-text-muted">
                <div className="admin-surface-soft rounded-lg px-4 py-3">
                  Responsable:{' '}
                  <span className="font-semibold admin-text">
                    {userMap.get(selectedJob.designerId)?.name}
                  </span>
                </div>
                <div className="admin-surface-soft rounded-lg px-4 py-3">
                  Asignó:{' '}
                  <span className="font-semibold admin-text">
                    {userMap.get(selectedJob.assignedById)?.name}
                  </span>
                </div>
                <div className="admin-surface-soft rounded-lg px-4 py-3">
                  Fecha límite:{' '}
                  <span className="font-semibold admin-text">
                    {formatDateTime(selectedJob.dueDate)}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="admin-kicker mb-3">Observaciones internas</h3>
                <div className="space-y-2">
                  {selectedJob.internalNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-lg border border-[var(--admin-border)] p-4 text-sm admin-text-muted"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              {/* Files */}
              <div>
                <h3 className="admin-kicker mb-3">Archivos y entregables</h3>
                <div className="space-y-2">
                  {selectedJob.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border border-[var(--admin-border)] p-3 text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Paperclip className="h-4 w-4 shrink-0 admin-text-faint" />
                        <div className="min-w-0">
                          <p className="font-semibold admin-text truncate">{file.name}</p>
                          <p className="admin-text-muted text-xs">{file.size}</p>
                        </div>
                      </div>
                      <StatusBadge tone={file.visibleToCustomer ? 'success' : 'neutral'}>
                        {file.visibleToCustomer ? 'Visible' : 'Interno'}
                      </StatusBadge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="admin-kicker mb-3">Trazabilidad</h3>
                <div className="relative space-y-0">
                  {selectedJob.timeline.map((event, idx) => (
                    <div key={event.id} className="flex gap-3">
                      {/* connector */}
                      <div className="flex flex-col items-center">
                        <div className="mt-4 h-3 w-3 shrink-0 rounded-full border-2 border-[var(--admin-accent)] bg-[var(--admin-panel)]" />
                        {idx < selectedJob.timeline.length - 1 && (
                          <div className="w-px flex-1 bg-[var(--admin-border)]" />
                        )}
                      </div>
                      <div className="admin-surface-soft mb-2 flex-1 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <FileText className="mt-0.5 h-4 w-4 shrink-0 admin-text-faint" />
                          <div>
                            <p className="font-semibold text-sm admin-text">{event.internalLabel}</p>
                            <p className="mt-0.5 text-xs admin-text-muted">{formatDateTime(event.at)}</p>
                            <p className="mt-0.5 admin-text-faint text-[10px] uppercase tracking-[0.15em]">
                              {event.actor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="sticky bottom-0 border-t border-[var(--admin-border)] bg-[var(--admin-panel)] px-6 py-4 space-y-3">
              {nextStatusMap[selectedJob.status] ? (
                <button
                  type="button"
                  onClick={() =>
                    setJobs((current) =>
                      current.map((job) =>
                        job.id === selectedJob.id
                          ? { ...job, status: nextStatusMap[selectedJob.status] ?? job.status }
                          : job,
                      ),
                    )
                  }
                  className="admin-primary-button w-full inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold"
                >
                  Mover al siguiente estado <Clock3 className="h-4 w-4" />
                </button>
              ) : null}

              {hasPermission('production.assign') ? (
                <div className="rounded-xl border border-[var(--admin-border)] p-4">
                  <p className="admin-kicker mb-3">Reasignación</p>
                  <div className="grid gap-2">
                    {designers.map((designer) => (
                      <button
                        key={designer.id}
                        type="button"
                        onClick={() =>
                          setJobs((current) =>
                            current.map((job) =>
                              job.id === selectedJob.id
                                ? {
                                    ...job,
                                    designerId: designer.id,
                                    assignedById:
                                      user && 'role' in user ? user.id : job.assignedById,
                                  }
                                : job,
                            ),
                          )
                        }
                        className="admin-surface-soft flex items-center justify-between rounded-lg px-4 py-3 text-left transition hover:bg-[var(--admin-surface2)]"
                      >
                        <span className="font-semibold text-sm admin-text">{designer.name}</span>
                        <ArrowRightLeft className="h-4 w-4 admin-text-faint" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
