import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Catálogo de productos',  to: '/catalog' },
  { label: 'Servicios creativos',    to: '/services' },
  { label: 'Diseño personalizado',   to: '/custom-design' },
  { label: 'Seguimiento de pedido',  to: '/track' },
  { label: 'Contacto comercial',     to: '/contact' },
];

const socialLinks = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook,  href: '#', label: 'Facebook'  },
  { Icon: Youtube,   href: '#', label: 'YouTube'   },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
];

const contactItems = [
  { Icon: Phone,  value: '+57 (601) 234 5678',        sub: 'Lun – Vie, 8 am – 6 pm' },
  { Icon: Mail,   value: 'hola@megapublicidad.co',    sub: 'Respuesta en menos de 24 h' },
  { Icon: MapPin, value: 'Calle 72 #10-07, Bogotá',  sub: 'Visita con cita previa' },
  { Icon: Clock,  value: 'Lun – Vie 8:00 – 18:00',   sub: 'Sáb 9:00 – 13:00' },
];

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between py-2.5 text-sm transition-colors"
      style={{
        borderBottom: '1px solid var(--public-line)',
        color: 'var(--public-text-muted)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--public-text)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--public-text-muted)'; }}
    >
      {label}
      <span
        className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
        style={{ fontSize: 11, color: 'var(--public-accent)' }}
      >
        →
      </span>
    </Link>
  );
}

export default function PublicFooter() {
  return (
    <footer style={{ background: 'var(--public-bg)', borderTop: '1px solid var(--public-line)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 0' }}>

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.5fr]">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div
                className="grid place-items-center rounded-lg font-bold text-white"
                style={{
                  width: 36, height: 36, flexShrink: 0,
                  background: 'var(--public-primary)',
                  fontFamily: 'var(--public-font-display)',
                  fontSize: 14, fontWeight: 800,
                }}
              >
                MP
              </div>
              <div>
                <p
                  className="font-semibold leading-tight"
                  style={{ color: 'var(--public-text)', fontFamily: 'var(--public-font-display)', fontSize: 15 }}
                >
                  Mega Publicidad
                </p>
                <p style={{ fontSize: 11, color: 'var(--public-text-muted)', marginTop: 1 }}>
                  Creative Commerce · Bogotá
                </p>
              </div>
            </div>

            <p
              className="mt-5 leading-relaxed"
              style={{ fontSize: 13.5, color: 'var(--public-text-muted)', maxWidth: 320 }}
            >
              Estudio creativo especializado en diseño gráfico, impresión de gran formato y señalética
              corporativa. Más de 10 años transformando marcas con producción propia.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid place-items-center rounded-lg transition-all"
                  style={{
                    width: 36, height: 36,
                    border: '1px solid var(--public-line)',
                    background: 'var(--public-surface-muted)',
                    color: 'var(--public-text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--public-accent)';
                    e.currentTarget.style.color = 'var(--public-accent)';
                    e.currentTarget.style.background = 'rgba(92,240,232,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--public-line)';
                    e.currentTarget.style.color = 'var(--public-text-muted)';
                    e.currentTarget.style.background = 'var(--public-surface-muted)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                border: '1px solid rgba(92,240,232,0.2)',
                background: 'rgba(92,240,232,0.05)',
                fontSize: 11.5,
                color: 'rgba(92,240,232,0.75)',
              }}
            >
              <span
                className="animate-pulse rounded-full"
                style={{ width: 6, height: 6, background: 'var(--public-accent)', flexShrink: 0,
                  boxShadow: '0 0 6px var(--public-accent)' }}
              />
              Portal activo · Atención disponible
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p
              className="mb-4 font-mono text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--public-accent)', letterSpacing: '0.18em' }}
            >
              Navegación
            </p>
            <nav>
              {quickLinks.map((item) => (
                <NavLink key={item.to} {...item} />
              ))}
              <Link
                to="/account/login"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all"
                style={{
                  border: '1px solid var(--public-primary)',
                  background: 'rgba(124,91,250,0.1)',
                  color: 'var(--public-text)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,91,250,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(124,91,250,0.1)'; }}
              >
                Área de cliente →
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <p
              className="mb-4 font-mono text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--public-accent)', letterSpacing: '0.18em' }}
            >
              Contacto
            </p>
            <div className="space-y-3">
              {contactItems.map(({ Icon, value, sub }) => (
                <div
                  key={value}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{ background: 'var(--public-surface-muted)', border: '1px solid var(--public-line)' }}
                >
                  <div
                    className="grid place-items-center rounded-lg"
                    style={{
                      width: 32, height: 32, flexShrink: 0,
                      background: 'rgba(124,91,250,0.12)',
                      color: 'var(--public-primary)',
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="truncate text-sm font-medium"
                      style={{ color: 'var(--public-text-soft)' }}
                    >
                      {value}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: 'var(--public-text-muted)' }}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-3 py-5"
          style={{ borderTop: '1px solid var(--public-line)' }}
        >
          <p style={{ fontSize: 12, color: 'var(--public-text-muted)' }}>
            © 2026 Mega Publicidad S.A.S · NIT 900.123.456-7 · Bogotá, Colombia
          </p>
          <div className="flex gap-5">
            {['Términos y condiciones', 'Política de privacidad'].map((label) => (
              <span
                key={label}
                style={{ fontSize: 12, color: 'var(--public-text-muted)', cursor: 'default' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
