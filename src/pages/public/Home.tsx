import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Link2,
  PackageSearch,
  Palette,
  Printer,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicButton from '../../components/public/PublicButton';
import PublicCard from '../../components/public/PublicCard';
import PublicSection from '../../components/public/PublicSection';
import SectionHeading from '../../components/public/SectionHeading';
import {
  getOrderByTracking,
  portfolioHighlights,
  products,
  services,
  testimonials,
} from '../../data/mockData';
import { formatCurrency, formatDateTime } from '../../lib/format';

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
    title: 'Diseno personalizado',
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
  const featuredServices = services.filter((service) => service.featured).slice(0, 2);
  const [trackingTerm, setTrackingTerm] = useState('GP-24031');
  const trackedOrder = useMemo(() => getOrderByTracking(trackingTerm), [trackingTerm]);

  return (
    <div className="overflow-hidden">
      <PublicSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative">
            <div className="absolute -left-10 top-4 h-28 w-28 rounded-full bg-[rgba(103,232,249,0.12)] blur-3xl" />
            <p className="public-kicker">Dark premium experience</p>
            <h1 className="public-title mt-5">
              Diseno e impresion con presencia de estudio creativo y control de SaaS moderno.
            </h1>
            <p className="public-subtitle mt-6 max-w-2xl">
              Vende productos fisicos, gestiona servicios creativos y entrega proyectos
              personalizados desde una experiencia visual elegante, clara y optimizada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PublicButton to="/custom-design">
                Solicitar diseno <ArrowRight className="h-4 w-4" />
              </PublicButton>
              <PublicButton to="/track" variant="secondary">
                Rastrear pedido <PackageSearch className="h-4 w-4" />
              </PublicButton>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: '3 flujos', label: 'Producto, servicio y proyecto a medida' },
                { value: '24/7', label: 'Tracking y area de cliente siempre disponibles' },
                { value: '1 panel', label: 'Operacion comercial y creativa unificada' },
              ].map((item) => (
                <div key={item.label} className="public-muted-card px-4 py-4">
                  <p className="text-xl font-black tracking-tight text-[var(--public-text)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--public-text-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="public-orbit right-8 top-4 h-56 w-56" />
            <div className="public-orbit bottom-10 left-6 h-40 w-40" />
            <div className="public-panel-strong relative overflow-hidden p-6 sm:p-7">
              <div className="absolute -right-12 top-8 h-40 w-40 rounded-full bg-[rgba(103,232,249,0.16)] blur-3xl" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[rgba(103,232,249,0.18)] to-transparent" />
              <div className="grid gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="public-kicker">Live system snapshot</p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-[var(--public-text)]">
                      Portal comercial + seguimiento + operacion interna
                    </h2>
                  </div>
                  <div className="rounded-3xl border border-[rgba(103,232,249,0.22)] bg-[rgba(255,255,255,0.05)] p-3 text-[var(--public-accent)]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                  <div className="public-card p-5">
                    <p className="text-sm font-semibold text-[var(--public-text)]">
                      Venta y servicio con lectura rapida
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                      Productos destacados, servicios definidos y solicitudes a medida con entrada
                      clara desde el hero.
                    </p>
                  </div>
                  <div className="public-card p-5">
                    <p className="text-sm font-semibold text-[var(--public-text)]">
                      Seguimiento visible al cliente
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                      Estados publicos separados, entregables habilitados y consulta sin cuenta.
                    </p>
                  </div>
                </div>

                <div className="public-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--public-text)]">
                        Direccion visual del MVP
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--public-text-muted)]">
                        Superficies elevadas, gradientes sutiles, glow suave y jerarquia tipografica
                        limpia para una empresa de diseno e impresion.
                      </p>
                    </div>
                    <div className="h-24 w-24 rounded-[30px] bg-[radial-gradient(circle_at_30%_30%,rgba(103,232,249,0.7),transparent_26%),linear-gradient(140deg,rgba(139,92,246,0.9),rgba(59,130,246,0.35))] shadow-[0_22px_55px_rgba(59,130,246,0.24)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicSection>

      <PublicSection className="pt-2">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((link) => (
            <PublicCard key={link.title} className="p-5">
              <p className="text-lg font-bold tracking-tight text-[var(--public-text)]">{link.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                {link.description}
              </p>
              <Link
                to={link.to}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--public-accent)]"
              >
                Abrir <ChevronRight className="h-4 w-4" />
              </Link>
            </PublicCard>
          ))}
        </div>
      </PublicSection>

      <PublicSection>
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
                    className="h-full w-full object-cover opacity-82"
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
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-[var(--public-text)]">
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
      </PublicSection>

      <PublicSection className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <SectionHeading
            kicker="Servicios destacados"
            title="Servicios creativos con look editorial y enfoque SaaS"
            description="Visualmente se sienten premium, pero mantienen una jerarquia util para vender con rapidez y explicar alcance."
          />
          <div className="grid gap-5">
            {featuredServices.map((service) => (
              <PublicCard key={service.id} className="grid gap-5 p-6 lg:grid-cols-[0.9fr_0.42fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[rgba(59,130,246,0.24)] bg-[rgba(59,130,246,0.12)] px-3 py-1 text-xs font-semibold text-[#bcd7ff]">
                      {service.category}
                    </span>
                    <span className="rounded-full border border-[rgba(103,232,249,0.18)] bg-[rgba(103,232,249,0.08)] px-3 py-1 text-xs font-semibold text-[#baf3ff]">
                      {service.turnaround}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-[var(--public-text)]">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--public-text-muted)]">
                    {service.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.deliverables.map((deliverable) => (
                      <span
                        key={deliverable}
                        className="rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs font-medium text-[var(--public-text-muted)]"
                      >
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="public-panel p-5">
                  <div className="flex items-center gap-3 text-[var(--public-accent)]">
                    {service.category === 'Branding' ? (
                      <Palette className="h-5 w-5" />
                    ) : (
                      <Printer className="h-5 w-5" />
                    )}
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[var(--public-text-muted)]">Desde</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-white">
                    {formatCurrency(service.priceFrom)}
                  </p>
                </div>
              </PublicCard>
            ))}
          </div>
        </div>
      </PublicSection>

      <PublicSection>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <PublicCard strong className="relative overflow-hidden p-8">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.16),transparent_55%)]" />
            <SectionHeading
              kicker="Diseno personalizado"
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
                <div key={item.title} className="public-muted-card p-4">
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
                <div key={item.project} className="public-muted-card p-4">
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
      </PublicSection>

      <PublicSection className="bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02),transparent)]">
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
              <div className="absolute right-5 top-5 text-5xl font-black tracking-tight text-white/6">
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
      </PublicSection>

      <PublicSection>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            kicker="Portafolio"
            title="Casos con presencia visual fuerte, sin caer en saturacion"
            description="Una galeria compacta con bloques oscuros, brillos suaves y etiquetas claras para proyectar nivel creativo."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {portfolioHighlights.map((item, index) => (
              <PublicCard
                key={item.id}
                className={index === 0 ? 'md:col-span-2 p-6' : 'p-6'}
              >
                <div className="h-48 rounded-[24px] bg-[linear-gradient(135deg,rgba(139,92,246,0.24),rgba(59,130,246,0.08)),radial-gradient(circle_at_top_right,rgba(103,232,249,0.24),transparent_32%),rgba(255,255,255,0.03)]" />
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
      </PublicSection>

      <PublicSection className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]">
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

      <PublicSection>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <PublicCard strong className="p-8">
            <SectionHeading
              kicker="Seguimiento"
              title="Consulta el estado publico desde una interfaz oscura, clara y confiable"
              description="El rastreo se siente parte del mismo sistema premium y mantiene la separacion entre informacion interna y visible."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label className="flex-1">
                <span className="sr-only">Codigo de seguimiento</span>
                <div className="flex items-center gap-3 rounded-[22px] border border-[rgba(148,163,184,0.16)] bg-[rgba(15,23,42,0.72)] px-4 py-3">
                  <Link2 className="h-4 w-4 text-[var(--public-accent)]" />
                  <input
                    value={trackingTerm}
                    onChange={(event) => setTrackingTerm(event.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[var(--public-text-muted)]"
                    placeholder="GP-24031"
                  />
                </div>
              </label>
              <PublicButton to="/track">
                Ir al tracking <PackageSearch className="h-4 w-4" />
              </PublicButton>
            </div>
          </PublicCard>

          <PublicCard className="p-6">
            <p className="public-kicker">Vista previa</p>
            {trackedOrder ? (
              <>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--public-text)]">
                  {trackedOrder.lineItems[0]?.name}
                </h3>
                <div className="mt-6 grid gap-3">
                  <div className="public-muted-card flex items-center justify-between px-4 py-4 text-sm">
                    <span className="text-[var(--public-text-muted)]">Tracking</span>
                    <span className="font-semibold text-white">{trackedOrder.trackingCode}</span>
                  </div>
                  <div className="public-muted-card flex items-center justify-between px-4 py-4 text-sm">
                    <span className="text-[var(--public-text-muted)]">Estado visible</span>
                    <span className="font-semibold text-[#baf3ff]">
                      {publicStatusLabels[trackedOrder.publicStatus]}
                    </span>
                  </div>
                  <div className="public-muted-card flex items-center justify-between px-4 py-4 text-sm">
                    <span className="text-[var(--public-text-muted)]">Entrega estimada</span>
                    <span className="font-semibold text-white">
                      {formatDateTime(trackedOrder.estimatedDelivery)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm leading-7 text-[var(--public-text-muted)]">
                Ingresa un codigo valido para ver una vista previa del estado publico.
              </p>
            )}
          </PublicCard>
        </div>
      </PublicSection>

      <PublicSection className="pb-4">
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
                { label: 'Correo', value: 'hola@graficapro.co' },
                { label: 'Ubicacion', value: 'Bogota, zona industrial' },
              ].map((item) => (
                <div key={item.label} className="public-muted-card p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--public-accent)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[var(--public-text)]">{item.value}</p>
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
                  className="public-muted-card flex items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--public-text)] transition hover:border-[rgba(103,232,249,0.24)]"
                >
                  {item.title}
                  <ChevronRight className="h-4 w-4 text-[var(--public-accent)]" />
                </Link>
              ))}
            </div>
          </PublicCard>
        </div>
      </PublicSection>
    </div>
  );
}
