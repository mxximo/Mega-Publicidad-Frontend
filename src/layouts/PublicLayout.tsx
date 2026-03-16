import { Menu, PackageSearch, Sparkles, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import PublicButton from '../components/public/PublicButton';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isCustomer, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catalogo', path: '/catalog' },
    { name: 'Servicios', path: '/services' },
    { name: 'Diseno a medida', path: '/custom-design' },
    { name: 'Tracking', path: '/track' },
    { name: 'Contacto', path: '/contact' },
  ];

  const customerName = user && !('role' in user) ? user.name : null;
  const isHome = location.pathname === '/';

  return (
    <div className="public-shell">
      <div className="public-noise" />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-200',
          isScrolled || !isHome ? 'py-3' : 'py-5',
        )}
      >
        <div className="public-container">
          <div
            className={cn(
              'mx-auto flex items-center justify-between rounded-full border px-4 py-3 transition-all sm:px-5',
              isScrolled || !isHome
                ? 'border-[rgba(148,163,184,0.16)] bg-[rgba(9,17,31,0.82)] shadow-[0_18px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl'
                : 'border-transparent bg-transparent',
            )}
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-2xl border border-[rgba(139,92,246,0.3)] bg-[linear-gradient(135deg,rgba(139,92,246,0.22),rgba(59,130,246,0.18))] px-3 py-2 text-sm font-black uppercase tracking-[0.28em] text-white shadow-[0_8px_30px_rgba(91,74,255,0.24)]">
                GP
              </div>
              <div>
                <p className="text-base font-black tracking-tight text-[var(--public-text)] sm:text-lg">
                  GraficaPro
                </p>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--public-text-muted)]">
                  creative commerce system
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition',
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-[var(--public-text-muted)] hover:text-white',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/track"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-semibold text-[var(--public-text)]"
              >
                <PackageSearch className="h-4 w-4 text-[var(--public-accent)]" />
                Rastrear
              </Link>
              <Link
                to={isCustomer ? '/account' : '/account/login'}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-semibold text-[var(--public-text)]"
              >
                <User className="h-4 w-4 text-[var(--public-text-muted)]" />
                {isCustomer ? customerName : 'Area cliente'}
              </Link>
              <PublicButton to="/custom-design" className="px-5 py-2.5">
                Solicitar diseno
              </PublicButton>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(255,255,255,0.04)] p-2 text-[var(--public-text)] lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen ? (
            <div className="public-panel mt-3 p-4 lg:hidden">
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--public-text-muted)] transition hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to={isCustomer ? '/account' : '/account/login'}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--public-text-muted)] transition hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                >
                  {isCustomer ? 'Mi cuenta' : 'Area cliente'}
                </Link>
                <PublicButton to="/custom-design" className="mt-2 w-full">
                  Solicitar diseno <Sparkles className="h-4 w-4" />
                </PublicButton>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main className="relative z-10 pt-24">
        <Outlet />
      </main>

      <footer className="public-section pt-16">
        <div className="public-container">
          <div className="public-panel-strong overflow-hidden p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
              <div>
                <p className="public-kicker">GraficaPro</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--public-text)]">
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
                  <Link to="/catalog" className="hover:text-white">Catalogo</Link>
                  <Link to="/services" className="hover:text-white">Servicios</Link>
                  <Link to="/custom-design" className="hover:text-white">Diseno personalizado</Link>
                  <Link to="/track" className="hover:text-white">Seguimiento</Link>
                </div>
              </div>

              <div>
                <p className="public-kicker">Acceso</p>
                <div className="mt-5 grid gap-3 text-sm text-[var(--public-text-muted)]">
                  <Link to="/account/login" className="hover:text-white">Area de cliente</Link>
                  <Link to="/contact" className="hover:text-white">Contacto comercial</Link>
                  <Link to="/admin/login" className="hover:text-white">Ingreso empleados</Link>
                  <span>hola@graficapro.co</span>
                </div>
              </div>
            </div>

            <div className="public-divider mt-10" />
            <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--public-text-muted)] sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 GraficaPro. Sistema visual dark premium para el portal publico.</p>
              <p>Bogota, Colombia</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
