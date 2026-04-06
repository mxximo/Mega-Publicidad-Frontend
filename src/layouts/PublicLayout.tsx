import { ArrowRight, PackageSearch, User } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CrystalBackground from '../components/backgrounds/CrystalBackground';
import { useAuth } from '../context/AuthContext';

export default function PublicLayout() {
  const { isCustomer, user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catalogo', path: '/catalog' },
    { name: 'Servicios', path: '/services' },
    { name: 'Diseno a medida', path: '/custom-design' },
    { name: 'Tracking', path: '/track' },
    { name: 'Contacto', path: '/contact' },
  ];

  const customerName = user && !('role' in user) ? user.name : null;

  return (
    <div className="public-shell flex min-h-screen flex-col">
      <CrystalBackground className="pointer-events-none fixed inset-0 z-0 opacity-70" />
      <div className="public-noise" />

      <header className="gp-nav-wrap gp-nav-wrap-scrolled">
        <div className="public-container">
          <div className="gp-nav-pill gp-nav-pill-scrolled">
            <Link to="/" className="gp-nav-brand">
              <div className="gp-nav-isotipo">MP</div>
              <div className="gp-nav-brand-text">
                <span className="gp-nav-brand-name">Mega Publicidad</span>
                <span className="gp-nav-brand-sub">creative commerce</span>
              </div>
            </Link>

            <div className="gp-nav-divider hidden lg:block" />

            <nav className="gp-nav-links flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`gp-nav-link${location.pathname === link.path ? ' gp-nav-link-active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="gp-nav-divider hidden lg:block" />

            <div className="gp-nav-actions flex">
              <Link to="/track" className="gp-nav-btn-track">
                <PackageSearch className="h-4 w-4 text-[var(--public-accent)]" />
                Rastrear
              </Link>
              <Link to={isCustomer ? '/account' : '/account/login'} className="gp-nav-btn-account">
                <User className="h-4 w-4 text-[var(--public-text-muted)]" />
                {isCustomer ? customerName : 'Area cliente'}
              </Link>
              <Link to="/custom-design" className="gp-nav-btn-cta">
                Solicitar diseno
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 pt-24">
        <Outlet />
      </main>

      <footer className="mt-auto pt-10 pb-0 sm:pt-12">
        <div className="public-container">
          <div className="gp-panel-strong overflow-hidden p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
              <div>
                <p className="public-kicker">Mega Publicidad</p>
                <h2 className="public-display mt-4 text-3xl font-extrabold tracking-[-0.04em] text-[var(--public-text)]">
                  Plataforma premium para diseno, impresion y seguimiento al cliente.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-[var(--public-text-muted)]">
                  Portal comercial, area privada, tracking abierto y un lenguaje visual pensado para
                  verse como una empresa creativa con tecnologia moderna.
                </p>
              </div>

              <div>
                <p className="public-kicker">Explorar</p>
                <div className="mt-5 grid gap-3 text-sm text-[var(--public-text-muted)]">
                  <Link to="/catalog" className="transition hover:text-white">Catalogo</Link>
                  <Link to="/services" className="transition hover:text-white">Servicios</Link>
                  <Link to="/custom-design" className="transition hover:text-white">Diseno personalizado</Link>
                  <Link to="/track" className="transition hover:text-white">Seguimiento</Link>
                </div>
              </div>

              <div>
                <p className="public-kicker">Acceso</p>
                <div className="mt-5 grid gap-3 text-sm text-[var(--public-text-muted)]">
                  <Link to="/account/login" className="transition hover:text-white">Area de cliente</Link>
                  <Link to="/contact" className="transition hover:text-white">Contacto comercial</Link>
                  <Link to="/admin/login" className="transition hover:text-white">Ingreso empleados</Link>
                  <span>hola@megapublicidad.co</span>
                </div>
              </div>
            </div>

            <div className="public-divider mt-10" />
            <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--public-text-muted)] sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Mega Publicidad. Sistema visual dark premium para el portal publico.</p>
              <p>Bogota, Colombia</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

