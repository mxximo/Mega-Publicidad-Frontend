import { useMemo, useState } from 'react';
import { ArrowRightLeft, Clock3, FileText, Paperclip } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { creativeJobs, customers, internalUsers } from '../../data/mockData';
import { formatDateTime } from '../../lib/format';
import type { CreativeJob, CreativeJobStatus } from '../../types/domain';

const columns: {
  id: CreativeJobStatus;
  title: string;
  tone: 'neutral' | 'info' | 'warning' | 'accent' | 'success';
}[] = [
  { id: 'requested', title: 'Solicitud', tone: 'neutral' },
  { id: 'assigned', title: 'Asignado', tone: 'accent' },
  { id: 'in_progress', title: 'En proceso', tone: 'info' },
  { id: 'review', title: 'Revision', tone: 'warning' },
  { id: 'delivery', title: 'Entrega', tone: 'info' },
  { id: 'closed', title: 'Cierre', tone: 'success' },
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
  const [selectedJobId, setSelectedJobId] = useState<string>(creativeJobs[0]?.id ?? '');

  const visibleJobs = useMemo(() => {
    if (!user || !('role' in user)) {
      return [];
    }

    return user.role === 'designer' ? jobs.filter((job) => job.designerId === user.id) : jobs;
  }, [jobs, user]);

  const selectedJob = useMemo(
    () => visibleJobs.find((job) => job.id === selectedJobId) ?? visibleJobs[0] ?? null,
    [visibleJobs, selectedJobId],
  );

  const designers = useMemo(
    () => internalUsers.filter((candidate) => candidate.role === 'designer'),
    [],
  );

  const customerMap = useMemo(
    () => new Map(customers.map((c) => [c.id, c])),
    [],
  );

  const userMap = useMemo(
    () => new Map(internalUsers.map((u) => [u.id, u])),
    [],
  );

  const jobsByColumn = useMemo(
    () => {
      const map = new Map<CreativeJobStatus, typeof visibleJobs>();
      for (const col of columns) map.set(col.id, []);
      for (const job of visibleJobs) {
        const list = map.get(job.status);
        if (list) list.push(job);
      }
      return map;
    },
    [visibleJobs],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="admin-panel p-6">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="admin-kicker">Produccion creativa</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight admin-text">
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

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-4">
            {columns.map((column) => (
              <div key={column.id} className="admin-panel-soft w-72 rounded-xl p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <StatusBadge tone={column.tone}>{column.title}</StatusBadge>
                  <span className="admin-text-faint text-xs font-bold uppercase tracking-[0.18em]">
                    {jobsByColumn.get(column.id)?.length ?? 0}
                  </span>
                </div>
                <div className="space-y-3">
                  {(jobsByColumn.get(column.id) ?? []).map((job) => {
                      const customer = customerMap.get(job.customerId);
                      return (
                        <button
                          key={job.id}
                          type="button"
                          onClick={() => setSelectedJobId(job.id)}
                          className={`w-full rounded-lg border p-4 text-left transition ${
                            selectedJobId === job.id
                              ? 'border-[var(--admin-accent)] bg-[var(--admin-surface)]'
                              : 'border-[var(--admin-border)] bg-[var(--admin-surface)] hover:border-[var(--admin-border2)]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
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
                            <span className="admin-text-faint text-xs font-medium">{job.id}</span>
                          </div>
                          <p className="mt-4 font-bold admin-text">{job.title}</p>
                          <p className="mt-2 text-sm admin-text-muted">{customer?.name}</p>
                          <p className="mt-4 admin-text-faint text-xs uppercase tracking-[0.18em]">
                            Vence {formatDateTime(job.dueDate)}
                          </p>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-panel p-6">
        {!selectedJob ? (
          <p className="text-sm admin-text-muted">No hay trabajos visibles para este usuario.</p>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium admin-text-muted">{selectedJob.id}</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight admin-text">
                  {selectedJob.title}
                </h2>
              </div>
              <StatusBadge tone="info">{selectedJob.status}</StatusBadge>
            </div>

            <div className="mt-6 space-y-3 text-sm admin-text-muted">
              <div className="admin-surface-soft rounded-lg px-4 py-3">
                Responsable principal:{' '}
                <span className="font-semibold admin-text">
                  {userMap.get(selectedJob.designerId)?.name}
                </span>
              </div>
              <div className="admin-surface-soft rounded-lg px-4 py-3">
                Asigno:{' '}
                <span className="font-semibold admin-text">
                  {userMap.get(selectedJob.assignedById)?.name}
                </span>
              </div>
              <div className="admin-surface-soft rounded-lg px-4 py-3">
                Fecha limite: {formatDateTime(selectedJob.dueDate)}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="admin-kicker">Observaciones internas</h3>
                <div className="mt-3 space-y-3">
                  {selectedJob.internalNotes.map((note) => (
                    <div key={note} className="rounded-lg border border-[var(--admin-border)] p-4 text-sm admin-text-muted">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="admin-kicker">Archivos y entregables</h3>
                <div className="mt-3 space-y-3">
                  {selectedJob.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border border-[var(--admin-border)] p-4 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 admin-text-faint" />
                        <div>
                          <p className="font-semibold admin-text">{file.name}</p>
                          <p className="admin-text-muted">{file.size}</p>
                        </div>
                      </div>
                      <StatusBadge tone={file.visibleToCustomer ? 'success' : 'neutral'}>
                        {file.visibleToCustomer ? 'Visible al cliente' : 'Interno'}
                      </StatusBadge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
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
                  className="admin-primary-button inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold"
                >
                  Mover al siguiente estado <Clock3 className="h-4 w-4" />
                </button>
              ) : null}

              {hasPermission('production.assign') ? (
                <div className="rounded-xl border border-[var(--admin-border)] p-4">
                  <p className="admin-kicker">Reasignacion controlada</p>
                  <div className="mt-3 grid gap-2">
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
                        <span className="font-semibold admin-text">{designer.name}</span>
                        <ArrowRightLeft className="h-4 w-4 admin-text-faint" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="rounded-xl border border-[var(--admin-border)] p-4">
                <p className="admin-kicker">Trazabilidad</p>
                <div className="mt-3 space-y-3">
                  {selectedJob.timeline.map((event) => (
                    <div key={event.id} className="admin-surface-soft flex gap-3 rounded-lg p-4">
                      <FileText className="mt-0.5 h-4 w-4 admin-text-faint" />
                      <div>
                        <p className="font-semibold admin-text">{event.internalLabel}</p>
                        <p className="mt-1 text-sm admin-text-muted">{formatDateTime(event.at)}</p>
                        <p className="mt-1 admin-text-faint text-xs uppercase tracking-[0.18em]">
                          {event.actor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
