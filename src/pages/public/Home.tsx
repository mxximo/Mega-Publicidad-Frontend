import { ArrowRight, ChevronRight, Sparkles, WandSparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PublicButton from '../../components/public/PublicButton';
import PublicCard from '../../components/public/PublicCard';
import PublicSection from '../../components/public/PublicSection';
import SectionHeading from '../../components/public/SectionHeading';
import {
  portfolioHighlights,
  products,
  testimonials,
} from '../../data/mockData';
import { formatCurrency } from '../../lib/format';

const quickLinks = [
  {
    title: 'Catalogo listo para vender',
    description: 'Productos fisicos listos para compra, cotizacion y entrega.',
    to: '/catalog',
  },
  {
    title: 'Servicios creativos',
    description: 'Branding, piezas digitales y editorial con alcance claro.',
    to: '/services',
  },
  {
    title: 'Diseño personalizado',
    description: 'Brief, asignacion y seguimiento para proyectos a medida.',
    to: '/custom-design',
  },
  {
    title: 'Area de cliente',
    description: 'Historial, tracking y entregables visibles en un solo lugar.',
    to: '/account/login',
  },
];

const publicStatusLabels = {
  received: 'Recibido',
  scheduled: 'Programado',
  in_design: 'En desarrollo',
  in_review: 'En revision',
  ready_for_delivery: 'Listo para entrega',
  completed: 'Completado',
};

export default function Home() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);
  const heroRootRef = useRef<HTMLElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = heroRootRef.current;
    const canvas = heroCanvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const totalPoints = 55;
    let animationFrame = 0;
    let points: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }> = [];

    const buildPoints = () => {
      points = Array.from({ length: totalPoints }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const resizeCanvas = () => {
      const box = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(box.width));
      height = Math.max(1, Math.floor(box.height));
      canvas.width = width;
      canvas.height = height;
      buildPoints();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < totalPoints; i += 1) {
        const point = points[i];
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 139, 250, 0.35)';
        ctx.fill();

        for (let j = i + 1; j < totalPoints; j += 1) {
          const next = points[j];
          const distance = Math.hypot(point.x - next.x, point.y - next.y);
          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - distance / 110) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <section ref={heroRootRef} className="gp-hero">
        <canvas ref={heroCanvasRef} className="gp-hero-canvas" />
        <div className="gp-hero-blob gp-hero-blob-1" />
        <div className="gp-hero-blob gp-hero-blob-2" />
        <div className="gp-hero-blob gp-hero-blob-3" />
        <div className="gp-hero-grid" />

        <div className="gp-hero-inner" style={{ gridTemplateColumns: '1fr', maxWidth: 1100 }}>
          <div className="gp-hero-left">
            <div className="gp-hero-eyebrow">
              Estudio creativo · SaaS moderno
            </div>

            <h1 className="gp-hero-title">
              Diseño e impresion
              <br />
              <span className="gp-hero-title-gradient">con presencia real</span>
              <br />y control total.
            </h1>

            <p className="gp-hero-subtitle">
              Vende productos fisicos, gestiona servicios creativos y entrega proyectos a medida
              todo desde una sola plataforma visual, clara y optimizada para tus clientes.
            </p>

            <div className="gp-hero-cta-row">
              <Link to="/custom-design" className="gp-hero-btn-primary">
                Solicitar diseno
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/track" className="gp-hero-btn-secondary">
                <span className="gp-hero-btn-icon">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle
                      cx="8"
                      cy="8"
                      r="5.5"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="1.4"
                    />
                    <circle cx="8" cy="8" r="1.8" fill="rgba(255,255,255,0.7)" />
                  </svg>
                </span>
                Rastrear pedido
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicSection className="pt-3">
        <div className="gp-section-shell gp-section-shell-compact">
          <div className="gp-section-shell-orb gp-section-shell-orb-cyan" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((link) => (
              <PublicCard key={link.title} className="p-5 sm:p-6">
                <div className="mb-4 h-px w-14 bg-gradient-to-r from-[rgba(92,240,232,0.55)] to-transparent" />
                <p className="text-lg font-bold tracking-tight text-[var(--public-text)]">{link.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                  {link.description}
                </p>
                <Link
                  to={link.to}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--public-accent)] transition hover:translate-x-0.5"
                >
                  Abrir <ChevronRight className="h-4 w-4" />
                </Link>
              </PublicCard>
            ))}
          </div>
        </div>
      </PublicSection>

      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-violet" />
          <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              kicker="Productos destacados"
              title="Impresion y publicidad con presencia premium desde el primer vistazo"
              description="Cards oscuras elevadas, contraste alto y lectura inmediata para destacar el catalogo sin perder claridad comercial."
            />
            <PublicButton to="/catalog" variant="secondary">
              Ver catalogo completo
            </PublicButton>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <PublicCard key={product.id} className="overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover opacity-84 transition duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,17,31,0.95)] via-[rgba(9,17,31,0.1)] to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[rgba(139,92,246,0.22)] bg-[rgba(139,92,246,0.12)] px-3 py-1 text-xs font-semibold text-[#d4c5ff]">
                      {product.category}
                    </span>
                    <span className="text-sm font-medium text-[var(--public-text-muted)]">
                      {product.leadTime}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.65rem] font-black tracking-[-0.04em] text-[var(--public-text)]">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-black tracking-tight text-white">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm text-[var(--public-text-muted)]">
                      {product.stock} en stock
                    </span>
                  </div>
                </div>
              </PublicCard>
            ))}
          </div>
          </div>
        </div>
      </PublicSection>

      <PublicSection className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]">
        <SectionHeading
          kicker="Servicios destacados"
          title="Servicios creativos con look editorial y enfoque SaaS"
          description="Visualmente se sienten premium, pero mantienen una jerarquia util para vender con rapidez y explicar alcance."
          align="center"
        />
        <div className="mt-4 text-center text-sm text-[var(--public-text-muted)]">
          Consulta todos los paquetes en la seccion de servicios.
        </div>
        <div className="mt-6 flex justify-center">
          <PublicButton to="/services">Ir a servicios</PublicButton>
        </div>
      </PublicSection>

      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-gold" />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <PublicCard strong className="relative overflow-hidden p-8">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.16),transparent_55%)]" />
            <SectionHeading
              kicker="Diseño personalizado"
              title="Cuando el proyecto necesita brief, criterio creativo y trazabilidad completa"
              description="El flujo a medida se presenta como una propuesta de alto valor: no compite visualmente con un catalogo, sino que transmite acompanamiento y metodo."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: WandSparkles,
                  title: 'Brief guiado',
                  description: 'Canales, objetivos, fecha limite y contexto del negocio.',
                },
                {
                  icon: Sparkles,
                  title: 'Asignacion precisa',
                  description: 'Un administrador define prioridad y responsable principal.',
                },
                {
                  icon: ArrowRight,
                  title: 'Revision y entrega',
                  description: 'Estados internos y estados visibles claramente separados.',
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
              <PublicButton to="/custom-design">
                Iniciar proyecto a medida <ArrowRight className="h-4 w-4" />
              </PublicButton>
            </div>
          </PublicCard>

          <PublicCard className="p-6">
            <p className="public-kicker">Solicitudes activas</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--public-text)]">
              Pipeline visual para mostrar capacidad creativa
            </h3>
            <div className="mt-6 space-y-4">
              {[
                {
                  stage: 'Brief validado',
                  project: 'Sistema visual para feria tecnologica',
                  note: 'Pendones, brochure y piezas para pantallas.',
                },
                {
                  stage: 'En revision',
                  project: 'Campana estacional de restaurante',
                  note: 'Menus, vitrinas y material para punto de venta.',
                },
                {
                  stage: 'Entrega',
                  project: 'Pack social media mensual',
                  note: '10 piezas listas para aprobacion del cliente.',
                },
              ].map((item) => (
                <div key={item.project} className="gp-muted-card p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--public-accent)]">
                    {item.stage}
                  </p>
                  <p className="mt-3 text-lg font-bold text-[var(--public-text)]">{item.project}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--public-text-muted)]">{item.note}</p>
                </div>
              ))}
            </div>
          </PublicCard>
          </div>
        </div>
      </PublicSection>

      <PublicSection className="bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.018),transparent)]">
        <div className="gp-section-shell">
          <SectionHeading
            kicker="Como funciona"
            title="Una experiencia clara desde la solicitud hasta la entrega final"
            description="Cada flujo mantiene su propia logica operativa, pero visualmente todo se siente parte del mismo sistema premium."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Entrada correcta',
                description: 'Producto, servicio o proyecto a medida desde el canal adecuado.',
              },
              {
                step: '02',
                title: 'Operacion interna',
                description: 'Venta, caja, asignacion y control sin mezclar estados.',
              },
              {
                step: '03',
                title: 'Seguimiento visible',
                description: 'El cliente consulta avances y entregables autorizados.',
              },
              {
                step: '04',
                title: 'Cierre profesional',
                description: 'Entrega final con historial y experiencia ordenada.',
              },
            ].map((item) => (
              <PublicCard key={item.step} className="relative p-6">
                <div className="absolute right-5 top-5 text-5xl font-black tracking-tight text-white/5">
                  {item.step}
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--public-accent)]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-xl font-black tracking-tight text-[var(--public-text)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                  {item.description}
                </p>
              </PublicCard>
            ))}
          </div>
        </div>
      </PublicSection>

      <PublicSection>
        <div className="gp-section-shell">
          <div className="gp-section-shell-orb gp-section-shell-orb-cyan" />
          <div className="flex flex-col gap-8">
          <SectionHeading
            kicker="Portafolio"
            title="Casos con presencia visual fuerte, sin caer en saturacion"
            description="Una galeria compacta con bloques oscuros, brillos suaves y etiquetas claras para proyectar nivel creativo."
            align="center"
          />
          <div className="portfolio-masonry">
            {portfolioHighlights.map((item) => (
              <PublicCard key={item.id} className="portfolio-card p-6">
                <div className="relative h-48 overflow-hidden rounded-[24px]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-full w-full bg-[linear-gradient(135deg,rgba(139,92,246,0.24),rgba(59,130,246,0.08)),radial-gradient(circle_at_top_right,rgba(103,232,249,0.24),transparent_32%),rgba(255,255,255,0.03)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,17,31,0.85)] via-transparent to-transparent" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--public-accent)]">
                  {item.tag}
                </p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-[var(--public-text)]">
                  {item.title}
                </h3>
              </PublicCard>
            ))}
          </div>
          </div>
        </div>
      </PublicSection>

      <PublicSection className="bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent)]">
        <SectionHeading
          kicker="Testimonios"
          title="Clientes que sintieron una experiencia mas premium y ordenada"
          description="Tipografia amplia, contraste alto y cards oscuras elevadas para darle valor a la prueba social."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <PublicCard key={testimonial.id} className="p-6 sm:p-8">
              <p className="text-xl font-medium leading-9 text-[var(--public-text)]">
                “{testimonial.quote}”
              </p>
              <div className="mt-8">
                <p className="font-bold text-[var(--public-text)]">{testimonial.author}</p>
                <p className="mt-1 text-sm text-[var(--public-text-muted)]">
                  {testimonial.company}
                </p>
              </div>
            </PublicCard>
          ))}
        </div>
      </PublicSection>

      <PublicSection className="pb-4">
        <div className="gp-section-shell gp-section-shell-strong">
          <div className="gp-section-shell-orb gp-section-shell-orb-violet" />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <PublicCard className="p-8">
            <SectionHeading
              kicker="Contacto"
              title="Un cierre visual limpio para convertir sin ruido"
              description="La seccion final mantiene el tono premium y orienta rapidamente al tipo de solicitud correcta."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Telefono', value: '+57 601 555 2040' },
                { label: 'Correo', value: 'hola@megapublicidad.co' },
                { label: 'Ubicacion', value: 'Bogota, zona industrial' },
              ].map((item) => (
                <div key={item.label} className="gp-muted-card p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--public-accent)]">
                    {item.label}
                  </p>
                  <p
                    className="mt-3 text-sm font-semibold text-[var(--public-text)]"
                    style={{
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere',
                      whiteSpace: 'normal',
                      display: 'inline-block',
                      maxWidth: '100%',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </PublicCard>

          <PublicCard strong className="p-8">
            <p className="public-kicker">CTA final</p>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-[var(--public-text)]">
              Dirige a cada cliente al flujo correcto desde el primer clic.
            </h3>
            <div className="mt-8 grid gap-3">
              {[
                { title: 'Comprar productos', to: '/catalog' },
                { title: 'Explorar servicios', to: '/services' },
                { title: 'Solicitar diseno', to: '/custom-design' },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="gp-muted-card flex items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--public-text)] transition hover:border-[rgba(103,232,249,0.24)]"
                >
                  {item.title}
                  <ChevronRight className="h-4 w-4 text-[var(--public-accent)]" />
                </Link>
              ))}
            </div>
          </PublicCard>
          </div>
        </div>
      </PublicSection>
    </div>
  );
}

