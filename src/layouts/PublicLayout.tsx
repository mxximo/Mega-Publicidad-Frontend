import { ArrowRight, Menu, PackageSearch, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CrystalBackground from '../components/backgrounds/CrystalBackground';
import { useAuth } from '../context/AuthContext';

export default function PublicLayout() {
  const { isCustomer, user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú al cambiar de ruta
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

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
      <CrystalBackground className="pointer-events-none fixed inset-0 z-0 opacity-100" />
      <div className="public-noise" />

      {/* Global decorative blobs — atmospheric depth across all pages */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-32 h-[600px] w-[700px] rounded-full bg-[rgba(109,40,217,0.32)] blur-[130px]" />
        <div className="absolute -right-24 top-1/4 h-[500px] w-[580px] rounded-full bg-[rgba(6,182,212,0.18)] blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[520px] rounded-full bg-[rgba(124,58,237,0.22)] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[300px] w-[380px] rounded-full bg-[rgba(59,130,246,0.14)] blur-[90px]" />
      </div>

      {/* Global grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 60%, transparent)',
        }}
      />

      <header className="gp-nav-wrap">
        <div className="public-container">
          <div className="gp-nav-pill">
            {/* Brand */}
            <Link to="/" className="gp-nav-brand">
              <div className="gp-nav-isotipo">MP</div>
              <div className="gp-nav-brand-text">
                <span className="gp-nav-brand-name">Mega Publicidad</span>
                <span className="gp-nav-brand-sub">creative commerce</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="gp-nav-divider hidden lg:block" />
            <nav className="gp-nav-links hidden lg:flex">
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
            <div className="gp-nav-actions hidden lg:flex">
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

            {/* Mobile: CTA + hamburger */}
            <div className="ml-auto flex items-center gap-3 lg:hidden">
              <Link
                to="/custom-design"
                className="rounded-full bg-[var(--public-accent)] px-4 py-2 text-xs font-bold text-white"
              >
                Solicitar
              </Link>
              <button
                type="button"
                aria-label="Abrir menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] text-[var(--public-text)]"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(5,3,18,0.96)] backdrop-blur-xl lg:hidden">
            <div className="public-container py-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      location.pathname === link.path
                        ? 'bg-[rgba(139,92,246,0.15)] text-[var(--public-accent)]'
                        : 'text-[var(--public-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 border-t border-[rgba(255,255,255,0.06)] pt-4 flex flex-col gap-2">
                <Link
                  to="/track"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[var(--public-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition"
                >
                  <PackageSearch className="h-4 w-4 text-[var(--public-accent)]" />
                  Rastrear pedido
                </Link>
                <Link
                  to={isCustomer ? '/account' : '/account/login'}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[var(--public-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition"
                >
                  <User className="h-4 w-4" />
                  {isCustomer ? customerName : 'Area de cliente'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 flex-1 pt-[60px]">
        <Outlet />
      </main>

      <footer className="relative z-10 mt-auto pt-10 pb-0 sm:pt-12">
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
              <p>&copy; 2026 Mega Publicidad. Sistema visual dark premium para el portal publico.</p>
              <p>Bogota, Colombia</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
