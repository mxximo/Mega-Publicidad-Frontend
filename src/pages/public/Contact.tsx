import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
      <section className="panel-card p-8">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
          Contacto comercial
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
          Cotiza segun el flujo correcto desde el primer contacto
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-500">
          El portal puede captar productos, servicios estandar o solicitudes personalizadas sin
          confundir la operacion interna.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[28px] bg-slate-50 p-5">
            <Phone className="h-5 w-5 text-[var(--brand)]" />
            <p className="mt-4 font-bold text-slate-950">Telefono</p>
            <p className="mt-2 text-sm text-slate-500">+57 601 555 2040</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <Mail className="h-5 w-5 text-[var(--brand)]" />
            <p className="mt-4 font-bold text-slate-950">Correo</p>
            <p className="mt-2 text-sm text-slate-500">hola@graficapro.co</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <MapPin className="h-5 w-5 text-[var(--brand)]" />
            <p className="mt-4 font-bold text-slate-950">Punto fisico</p>
            <p className="mt-2 text-sm text-slate-500">Bogota, zona industrial</p>
          </div>
        </div>
      </section>

      <section className="panel-card p-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Recomendacion de entrada</h2>
        <div className="mt-6 space-y-4">
          {[
            {
              title: 'Necesito comprar impresos',
              description: 'Usa el catalogo si ya sabes cantidades, formato y tiempo esperado.',
              to: '/catalog',
            },
            {
              title: 'Necesito un servicio estandar',
              description:
                'Ve a servicios si el alcance ya es repetible y el entregable esta definido.',
              to: '/services',
            },
            {
              title: 'Necesito algo a medida',
              description:
                'Entra a diseno personalizado si el proyecto requiere brief y validacion interna.',
              to: '/custom-design',
            },
          ].map((option) => (
            <Link
              key={option.title}
              to={option.to}
              className="block rounded-[28px] border border-slate-200 p-5 transition hover:border-[var(--brand)] hover:bg-slate-50"
            >
              <p className="font-bold text-slate-950">{option.title}</p>
              <p className="mt-2 text-sm text-slate-500">{option.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
