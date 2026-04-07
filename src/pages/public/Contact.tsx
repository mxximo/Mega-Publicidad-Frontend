import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicCard from '../../components/public/PublicCard';
import PublicSection from '../../components/public/PublicSection';
import SectionHeading from '../../components/public/SectionHeading';

export default function Contact() {
  return (
    <div className="overflow-hidden">
      <PublicSection>
        <div className="gp-section-shell gp-section-shell-strong">
          <div className="gp-section-shell-orb gp-section-shell-orb-cyan" />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <PublicCard className="p-8">
              <SectionHeading
                kicker="Contacto comercial"
                title="Cotiza segun el flujo correcto desde el primer contacto"
                description="El portal puede captar productos, servicios estandar o solicitudes personalizadas sin confundir la operacion interna."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Phone, label: 'Telefono', value: '+57 601 555 2040' },
                  { icon: Mail, label: 'Correo', value: 'hola@megapublicidad.co' },
                  { icon: MapPin, label: 'Punto fisico', value: 'Bogota, zona industrial' },
                ].map((item) => (
                  <div key={item.label} className="gp-muted-card p-5">
                    <item.icon className="h-5 w-5 text-[var(--public-accent)]" />
                    <p className="mt-4 font-bold text-[var(--public-text)]">{item.label}</p>
                    <p className="mt-2 text-sm text-[var(--public-text-muted)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </PublicCard>

            <PublicCard strong className="p-8">
              <h2 className="text-2xl font-black tracking-tight text-[var(--public-text)]">
                Recomendacion de entrada
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: 'Necesito comprar impresos',
                    description: 'Usa el catalogo si ya sabes cantidades, formato y tiempo esperado.',
                    to: '/catalog',
                  },
                  {
                    title: 'Necesito un servicio estandar',
                    description: 'Ve a servicios si el alcance ya es repetible y el entregable esta definido.',
                    to: '/services',
                  },
                  {
                    title: 'Necesito algo a medida',
                    description: 'Entra a diseno personalizado si el proyecto requiere brief y validacion interna.',
                    to: '/custom-design',
                  },
                ].map((option) => (
                  <Link
                    key={option.title}
                    to={option.to}
                    className="gp-muted-card flex items-center justify-between px-5 py-4 transition hover:border-[rgba(103,232,249,0.24)]"
                  >
                    <div>
                      <p className="font-bold text-[var(--public-text)]">{option.title}</p>
                      <p className="mt-2 text-sm text-[var(--public-text-muted)]">{option.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[var(--public-accent)]" />
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
