import StatusBadge from '../../components/StatusBadge';
import { internalUsers, portalSections } from '../../data/mockData';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <p className="admin-kicker">Configuracion</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight admin-text">
          Usuarios internos y contenido editable del portal
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="admin-panel p-6">
          <h2 className="text-xl font-black tracking-tight admin-text">Usuarios internos</h2>
          <div className="mt-5 space-y-3">
            {internalUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border border-[var(--admin-border)] p-4"
              >
                <div>
                  <p className="font-semibold admin-text">{user.name}</p>
                  <p className="text-sm admin-text-muted">{user.title}</p>
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

        <section className="admin-panel p-6">
          <h2 className="text-xl font-black tracking-tight admin-text">Secciones del portal</h2>
          <p className="mt-2 text-sm admin-text-muted">
            En el MVP solo se edita contenido, no estructura ni layout del sitio publico.
          </p>
          <div className="mt-5 space-y-3">
            {portalSections.map((section) => (
              <div
                key={section.id}
                className="admin-panel-soft flex items-center justify-between rounded-lg p-4"
              >
                <div>
                  <p className="font-semibold admin-text">{section.label}</p>
                  <p className="text-sm admin-text-muted">
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
