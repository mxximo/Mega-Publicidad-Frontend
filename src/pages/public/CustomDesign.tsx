import { ArrowRight, Layers3, MessageSquareQuote, TimerReset } from 'lucide-react';
import PublicBadge from '../../components/public/PublicBadge';
import PublicButton from '../../components/public/PublicButton';
import PublicCard from '../../components/public/PublicCard';
import PublicSection from '../../components/public/PublicSection';
import SectionHeading from '../../components/public/SectionHeading';
import { customRequests } from '../../data/mockData';

export default function CustomDesign() {
  return (
    <div className="overflow-hidden">
      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-violet" />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <PublicCard strong className="relative overflow-hidden p-8">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.16),transparent_55%)]" />
              <SectionHeading
                kicker="Diseno personalizado"
                title="Cuando el proyecto exige brief, asignacion y revision"
                description="Este flujo queda separado de los servicios estandar porque necesita solicitud, validacion, asignacion a un disenador responsable y cierre con trazabilidad completa."
              />
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
                  <div key={item.title} className="gp-muted-card p-4">
                    <item.icon className="h-5 w-5 text-[var(--public-accent)]" />
                    <p className="mt-4 font-bold text-[var(--public-text)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--public-text-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <PublicButton to="/contact">
                  Iniciar solicitud <ArrowRight className="h-4 w-4" />
                </PublicButton>
              </div>
            </PublicCard>

            <PublicCard className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="public-kicker">Solicitudes recientes</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-[var(--public-text)]">
                    Pipeline de proyectos personalizados
                  </h2>
                </div>
                <PublicBadge tone="accent">{customRequests.length} solicitudes</PublicBadge>
              </div>
              <div className="mt-6 space-y-4">
                {customRequests.map((request) => (
                  <div key={request.id} className="gp-muted-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-[var(--public-text)]">{request.title}</p>
                      <PublicBadge tone={request.status === 'approved' ? 'success' : 'warning'}>
                        {request.status}
                      </PublicBadge>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[var(--public-text-muted)]">
                      {request.brief}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {request.channels.map((channel) => (
                        <span
                          key={channel}
                          className="rounded-full border border-[var(--public-line)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs font-medium text-[var(--public-text-muted)]"
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PublicCard>
          </div>
        </div>
      </PublicSection>
    </div>
  );
}
