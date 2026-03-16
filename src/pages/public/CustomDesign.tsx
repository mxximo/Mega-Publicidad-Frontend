import { ArrowRight, Layers3, MessageSquareQuote, TimerReset } from 'lucide-react';
import { Link } from 'react-router-dom';
import { customRequests } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';

export default function CustomDesign() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
            Diseno personalizado
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Cuando el proyecto exige brief, asignacion y revision
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-500">
            Este flujo queda separado de los servicios estandar porque necesita solicitud, validacion,
            asignacion a un disenador responsable y cierre con trazabilidad completa.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: MessageSquareQuote,
                title: '1. Brief inicial',
                description: 'Canales, entregables esperados, fecha objetivo y contexto del negocio.',
              },
              {
                icon: Layers3,
                title: '2. Asignacion interna',
                description: 'Un administrador asigna un responsable principal unico y fija prioridad.',
              },
              {
                icon: TimerReset,
                title: '3. Revision y entrega',
                description: 'Estados separados entre operacion interna y lo que ve el cliente.',
              },
            ].map((item) => (
              <div key={item.title} className="panel-card p-5">
                <item.icon className="h-6 w-6 text-[var(--brand)]" />
                <h2 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Solicitudes recientes en el MVP</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Pipeline de proyectos personalizados
              </h2>
            </div>
            <StatusBadge tone="accent">{customRequests.length} solicitudes</StatusBadge>
          </div>
          <div className="mt-6 space-y-4">
            {customRequests.map((request) => (
              <div key={request.id} className="rounded-[28px] bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-slate-950">{request.title}</p>
                  <StatusBadge tone={request.status === 'approved' ? 'success' : 'warning'}>
                    {request.status}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm text-slate-500">{request.brief}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {request.channels.map((channel) => (
                    <span
                      key={channel}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-dark)]"
          >
            Iniciar solicitud <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
