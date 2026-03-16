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

  const selectedJob = visibleJobs.find((job) => job.id === selectedJobId) ?? visibleJobs[0] ?? null;
  const designers = internalUsers.filter((candidate) => candidate.role === 'designer');

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="panel-card p-6">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Produccion creativa
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
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
              <div key={column.id} className="w-72 rounded-[28px] bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <StatusBadge tone={column.tone}>{column.title}</StatusBadge>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {visibleJobs.filter((job) => job.status === column.id).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {visibleJobs
                    .filter((job) => job.status === column.id)
                    .map((job) => {
                      const customer = customers.find((candidate) => candidate.id === job.customerId);
                      return (
                        <button
                          key={job.id}
                          type="button"
                          onClick={() => setSelectedJobId(job.id)}
                          className={`w-full rounded-[24px] border p-4 text-left transition ${
                            selectedJobId === job.id
                              ? 'border-[var(--brand)] bg-white'
                              : 'border-slate-200 bg-white hover:border-slate-300'
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
                            <span className="text-xs font-medium text-slate-400">{job.id}</span>
                          </div>
                          <p className="mt-4 font-bold text-slate-950">{job.title}</p>
                          <p className="mt-2 text-sm text-slate-500">{customer?.name}</p>
                          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
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

      <section className="panel-card p-6">
        {!selectedJob ? (
          <p className="text-sm text-slate-500">No hay trabajos visibles para este usuario.</p>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{selectedJob.id}</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {selectedJob.title}
                </h2>
              </div>
              <StatusBadge tone="info">{selectedJob.status}</StatusBadge>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                Responsable principal:{' '}
                <span className="font-semibold text-slate-950">
                  {internalUsers.find((candidate) => candidate.id === selectedJob.designerId)?.name}
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                Asigno:{' '}
                <span className="font-semibold text-slate-950">
                  {internalUsers.find((candidate) => candidate.id === selectedJob.assignedById)?.name}
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                Fecha limite: {formatDateTime(selectedJob.dueDate)}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                  Observaciones internas
                </h3>
                <div className="mt-3 space-y-3">
                  {selectedJob.internalNotes.map((note) => (
                    <div key={note} className="rounded-[24px] border border-slate-200 p-4 text-sm text-slate-600">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                  Archivos y entregables
                </h3>
                <div className="mt-3 space-y-3">
                  {selectedJob.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-[24px] border border-slate-200 p-4 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="font-semibold text-slate-950">{file.name}</p>
                          <p className="text-slate-500">{file.size}</p>
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white"
                >
                  Mover al siguiente estado <Clock3 className="h-4 w-4" />
                </button>
              ) : null}

              {hasPermission('production.assign') ? (
                <div className="rounded-[28px] border border-slate-200 p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                    Reasignacion controlada
                  </p>
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
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left"
                      >
                        <span className="font-semibold text-slate-950">{designer.name}</span>
                        <ArrowRightLeft className="h-4 w-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-slate-200 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                  Trazabilidad
                </p>
                <div className="mt-3 space-y-3">
                  {selectedJob.timeline.map((event) => (
                    <div key={event.id} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                      <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
                      <div>
                        <p className="font-semibold text-slate-950">{event.internalLabel}</p>
                        <p className="mt-1 text-sm text-slate-500">{formatDateTime(event.at)}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
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
