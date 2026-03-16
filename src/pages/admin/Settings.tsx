import StatusBadge from '../../components/StatusBadge';
import { internalUsers, portalSections } from '../../data/mockData';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
          Configuracion
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          Usuarios internos y contenido editable del portal
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="panel-card p-6">
          <h2 className="text-xl font-black tracking-tight text-slate-950">Usuarios internos</h2>
          <div className="mt-5 space-y-3">
            {internalUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-[24px] border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-950">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.title}</p>
                </div>
                <StatusBadge
                  tone={
                    user.role === 'admin'
                      ? 'accent'
                      : user.role === 'cashier'
                        ? 'warning'
                        : 'info'
                  }
                >
                  {user.role}
                </StatusBadge>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-6">
          <h2 className="text-xl font-black tracking-tight text-slate-950">Secciones del portal</h2>
          <p className="mt-2 text-sm text-slate-500">
            En el MVP solo se edita contenido, no estructura ni layout del sitio publico.
          </p>
          <div className="mt-5 space-y-3">
            {portalSections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between rounded-[24px] bg-slate-50 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-950">{section.label}</p>
                  <p className="text-sm text-slate-500">
                    Actualizado {section.updatedAt.slice(0, 10)}
                  </p>
                </div>
                <StatusBadge tone={section.status === 'published' ? 'success' : 'warning'}>
                  {section.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
