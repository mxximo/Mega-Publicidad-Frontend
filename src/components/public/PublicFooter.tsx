import { Link } from 'react-router-dom';

const navLinks = {
  explorar: [
    { label: 'Catálogo',             to: '/catalog' },
    { label: 'Servicios',            to: '/services' },
    { label: 'Diseño personalizado', to: '/custom-design' },
    { label: 'Seguimiento',          to: '/track' },
  ],
  acceso: [
    { label: 'Área de cliente',      to: '/account/login' },
    { label: 'Contacto comercial',   to: '/contact' },
    { label: 'Ingreso empleados',    to: '/admin/login' },
    { label: 'hola@megapublicidad.co', to: null },
  ],
};

const css = `
  .mpf-root {
    position: relative;
    overflow: hidden;
    padding: 52px 0 0;
    background: #080c18;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
  }
  .mpf-bg-glow-1 { position:absolute;top:-160px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,192,0.06) 0%,transparent 65%);pointer-events:none; }
  .mpf-bg-glow-2 { position:absolute;bottom:-80px;left:-60px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(232,73,15,0.07) 0%,transparent 65%);pointer-events:none; }
  .mpf-grid   { position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none; }
  .mpf-corner { position:absolute;top:0;right:0;width:180px;height:180px;border-bottom-left-radius:100%;border:1px solid rgba(0,229,192,0.08);pointer-events:none; }
  .mpf-year   { font-family:'Syne',sans-serif;font-size:88px;font-weight:800;color:rgba(255,255,255,0.025);line-height:1;position:absolute;right:48px;bottom:24px;pointer-events:none;letter-spacing:-.04em;user-select:none; }
  .mpf-inner  { position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 32px; }
  .mpf-toprow { display:flex;align-items:center;justify-content:space-between;margin-bottom:44px; }
  .mpf-brand  { display:flex;align-items:center;gap:12px; }
  .mpf-mark   { width:34px;height:34px;background:#00e5c0;display:grid;place-items:center;font-family:'Syne',sans-serif;font-weight:800;font-size:16px;color:#080c18;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); }
  .mpf-name   { font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#00e5c0; }
  .mpf-badge  { display:flex;align-items:center;gap:8px;background:rgba(0,229,192,0.06);border:0.5px solid rgba(0,229,192,0.2);padding:6px 14px 6px 10px;font-size:11px;color:rgba(0,229,192,0.7);letter-spacing:.04em; }
  .mpf-pulse  { width:6px;height:6px;border-radius:50%;background:#00e5c0;box-shadow:0 0 6px #00e5c0;animation:mpf-blink 1.6s ease infinite; }
  @keyframes mpf-blink { 0%,100%{opacity:1} 50%{opacity:.2} }
  .mpf-cols   { display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:0;border-top:0.5px solid rgba(255,255,255,0.07); }
  .mpf-col    { padding:32px 36px 32px 0; }
  .mpf-col+.mpf-col { padding-left:32px;border-left:0.5px solid rgba(255,255,255,0.07); }
  .mpf-col:first-child { padding-left:0; }
  .mpf-col-label { font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#00e5c0;margin-bottom:18px;font-family:'Syne',sans-serif; }
  .mpf-headline { font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(22px,2.8vw,36px);line-height:1.05;letter-spacing:-.03em;color:#fff; }
  .mpf-headline em { color:#00e5c0;font-style:italic;font-family:'DM Sans',sans-serif;font-weight:300; }
  .mpf-desc   { margin-top:16px;font-size:13px;line-height:1.75;color:#5a6480;font-weight:300;max-width:280px; }
  .mpf-nav    { list-style:none;padding:0;margin:0;display:flex;flex-direction:column; }
  .mpf-nav li { display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid rgba(255,255,255,0.07);font-size:13.5px;color:rgba(232,234,240,0.75);transition:color .15s,padding-left .15s; }
  .mpf-nav li:last-child { border-bottom:none; }
  .mpf-nav li a { display:flex;align-items:center;justify-content:space-between;width:100%;color:inherit;text-decoration:none;transition:color .15s,padding-left .15s; }
  .mpf-nav li a:hover { color:#00e5c0;padding-left:6px; }
  .mpf-nav li a:hover .mpf-arr { transform:translateX(4px);color:#00e5c0; }
  .mpf-arr    { font-size:11px;color:#5a6480;transition:transform .15s,color .15s; }
  .mpf-bottom { display:flex;align-items:center;justify-content:space-between;padding:18px 0 28px;border-top:0.5px solid rgba(255,255,255,0.07);margin-top:4px; }
  .mpf-copy   { font-size:11.5px;color:#5a6480;font-weight:300; }
  .mpf-copy strong { font-weight:500;color:rgba(232,234,240,0.6); }
  .mpf-loc    { font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#5a6480;display:flex;align-items:center;gap:8px; }
  .mpf-loc-dot { width:5px;height:5px;border-radius:50%;background:#c9a84c;box-shadow:0 0 5px #c9a84c; }
  @media (max-width: 768px) {
    .mpf-cols { grid-template-columns:1fr; }
    .mpf-col+.mpf-col { padding-left:0;border-left:none;border-top:0.5px solid rgba(255,255,255,0.07); }
    .mpf-badge { display:none; }
    .mpf-year  { font-size:56px;right:16px; }
    .mpf-inner { padding:0 20px; }
    .mpf-bottom { flex-direction:column;gap:12px;align-items:flex-start; }
  }
`;

export default function PublicFooter() {
  return (
    <>
      <style>{css}</style>
      <footer className="mpf-root">
        <div className="mpf-bg-glow-1" />
        <div className="mpf-bg-glow-2" />
        <div className="mpf-grid" />
        <div className="mpf-corner" />
        <div className="mpf-year">2026</div>

        <div className="mpf-inner">
          {/* Top row */}
          <div className="mpf-toprow">
            <div className="mpf-brand">
              <div className="mpf-mark">M</div>
              <span className="mpf-name">Mega Publicidad</span>
            </div>
            <div className="mpf-badge">
              <span className="mpf-pulse" />
              Sistema activo · Bogotá, Colombia
            </div>
          </div>

          {/* Columns */}
          <div className="mpf-cols">
            <div className="mpf-col">
              <div className="mpf-col-label">Plataforma</div>
              <h2 className="mpf-headline">
                Diseño,<br />impresión<br /><em>& seguimiento.</em>
              </h2>
              <p className="mpf-desc">
                Portal comercial, área privada, tracking abierto y un lenguaje visual pensado para una empresa creativa con tecnología moderna.
              </p>
            </div>

            <div className="mpf-col">
              <div className="mpf-col-label">Explorar</div>
              <ul className="mpf-nav">
                {navLinks.explorar.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>
                      {item.label}<span className="mpf-arr">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mpf-col">
              <div className="mpf-col-label">Acceso</div>
              <ul className="mpf-nav">
                {navLinks.acceso.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to}>
                        {item.label}<span className="mpf-arr">→</span>
                      </Link>
                    ) : (
                      <span style={{ fontSize: 12, color: '#5a6480' }}>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mpf-bottom">
            <p className="mpf-copy">
              &copy; 2026 <strong>Mega Publicidad.</strong> Sistema visual dark premium para el portal público.
            </p>
            <div className="mpf-loc">
              <span className="mpf-loc-dot" />
              Bogotá, Colombia
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
