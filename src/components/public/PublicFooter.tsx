import { Link } from 'react-router-dom';

const explorar = [
  { label: 'Catálogo de productos', to: '/catalog' },
  { label: 'Servicios creativos',   to: '/services' },
  { label: 'Diseño personalizado',  to: '/custom-design' },
  { label: 'Seguimiento de pedido', to: '/track' },
];

const acceso = [
  { label: 'Área de cliente',     to: '/account/login' },
  { label: 'Contacto comercial',  to: '/contact' },
  { label: 'Ingreso empleados',   to: '/admin/login' },
];

export default function PublicFooter() {
  return (
    <footer
      style={{
        background: 'var(--public-bg)',
        borderTop: '1px solid var(--public-line)',
        fontFamily: 'var(--public-font-body)',
      }}
    >
      {/* Main grid */}
      <div
        style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 48px' }}
        className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr]"
      >
        {/* Brand column */}
        <div>
          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 36,
                height: 36,
                background: 'var(--public-primary)',
                borderRadius: 8,
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--public-font-display)',
                fontWeight: 800,
                fontSize: 15,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              MP
            </div>
            <span
              style={{
                fontFamily: 'var(--public-font-display)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--public-text)',
                letterSpacing: '-0.01em',
              }}
            >
              Mega Publicidad
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              marginTop: 20,
              fontSize: 13.5,
              lineHeight: 1.8,
              color: 'var(--public-text-muted)',
              maxWidth: 300,
            }}
          >
            Plataforma de diseño, impresión y seguimiento para empresas que necesitan velocidad, claridad y control total sobre sus proyectos gráficos.
          </p>

          {/* Contact chip */}
          <a
            href="mailto:hola@megapublicidad.co"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid var(--public-line)',
              background: 'var(--public-surface-muted)',
              fontSize: 12.5,
              color: 'var(--public-text-muted)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--public-accent)';
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--public-accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--public-line)';
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--public-text-muted)';
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--public-accent)',
                boxShadow: '0 0 6px var(--public-accent)',
                flexShrink: 0,
              }}
            />
            hola@megapublicidad.co
          </a>
        </div>

        {/* Explorar */}
        <div>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--public-accent)',
              marginBottom: 20,
              fontFamily: 'var(--public-font-mono)',
            }}
          >
            Explorar
          </p>
          <nav>
            {explorar.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 0',
                  borderBottom: '1px solid var(--public-line)',
                  fontSize: 13.5,
                  color: 'var(--public-text-soft)',
                  textDecoration: 'none',
                  transition: 'color 0.15s, padding-left 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--public-text)';
                  e.currentTarget.style.paddingLeft = '4px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--public-text-soft)';
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                {item.label}
                <span style={{ fontSize: 11, color: 'var(--public-text-muted)', marginLeft: 8 }}>→</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Acceso */}
        <div>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--public-accent)',
              marginBottom: 20,
              fontFamily: 'var(--public-font-mono)',
            }}
          >
            Acceso
          </p>
          <nav>
            {acceso.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 0',
                  borderBottom: '1px solid var(--public-line)',
                  fontSize: 13.5,
                  color: 'var(--public-text-soft)',
                  textDecoration: 'none',
                  transition: 'color 0.15s, padding-left 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--public-text)';
                  e.currentTarget.style.paddingLeft = '4px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--public-text-soft)';
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                {item.label}
                <span style={{ fontSize: 11, color: 'var(--public-text-muted)', marginLeft: 8 }}>→</span>
              </Link>
            ))}
          </nav>

          {/* Location badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
              padding: '7px 12px',
              borderRadius: 6,
              background: 'rgba(124,91,250,0.08)',
              border: '1px solid rgba(124,91,250,0.18)',
              fontSize: 11.5,
              color: 'var(--public-text-muted)',
              fontFamily: 'var(--public-font-mono)',
              letterSpacing: '0.05em',
            }}
          >
            <span
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--public-primary)',
                boxShadow: '0 0 5px var(--public-primary)',
                flexShrink: 0,
              }}
            />
            Bogotá, Colombia
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--public-line)',
          maxWidth: 1160,
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ fontSize: 12, color: 'var(--public-text-muted)', margin: 0 }}>
          © 2026 Mega Publicidad · Todos los derechos reservados
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Términos', 'Privacidad', 'Cookies'].map((label) => (
            <span
              key={label}
              style={{ fontSize: 12, color: 'var(--public-text-muted)', cursor: 'default' }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
