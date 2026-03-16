import type {
  CashSession,
  CreativeJob,
  CustomDesignRequest,
  Customer,
  FrequentCustomer,
  InternalUser,
  InventoryItem,
  Order,
  Payment,
  PortalSection,
  Product,
  ServiceItem,
} from '../types/domain';

export const internalUsers: InternalUser[] = [
  {
    id: 'usr-admin-1',
    name: 'Camila Torres',
    role: 'admin',
    email: 'admin@graficapro.co',
    password: 'Admin123*',
    title: 'Super Administradora',
    avatar: 'CT',
    activeJobs: 5,
  },
  {
    id: 'usr-cashier-1',
    name: 'Luis Mejia',
    role: 'cashier',
    email: 'ventas@graficapro.co',
    password: 'Ventas123*',
    title: 'Cajero Principal',
    avatar: 'LM',
    activeJobs: 0,
  },
  {
    id: 'usr-designer-1',
    name: 'Ana Gomez',
    role: 'designer',
    email: 'ana@graficapro.co',
    password: 'Diseno123*',
    title: 'Diseñadora Senior',
    avatar: 'AG',
    activeJobs: 4,
  },
  {
    id: 'usr-designer-2',
    name: 'Mateo Ruiz',
    role: 'designer',
    email: 'mateo@graficapro.co',
    password: 'Diseno123*',
    title: 'Diseñador de Producción',
    avatar: 'MR',
    activeJobs: 3,
  },
];

export const customers: Customer[] = [
  {
    id: 'cus-001',
    kind: 'account',
    name: 'TechCorp SAS',
    email: 'compras@techcorp.co',
    password: 'Cliente123*',
    phone: '+57 310 555 0123',
    documentType: 'NIT',
    documentNumber: '901245678',
    company: 'TechCorp SAS',
    city: 'Bogota',
    memberSince: '2024-09-05T09:00:00.000Z',
    notes: 'Cliente recurrente de branding y papeleria.',
  },
  {
    id: 'cus-002',
    kind: 'account',
    name: 'Maria Gomez',
    email: 'maria@gmail.com',
    password: 'Cliente123*',
    phone: '+57 320 111 4499',
    documentType: 'CC',
    documentNumber: '1032456789',
    city: 'Medellin',
    memberSince: '2025-01-12T14:00:00.000Z',
    notes: 'Suele pedir piezas para redes sociales.',
  },
  {
    id: 'cus-003',
    kind: 'guest',
    name: 'Restaurante Buen Sabor',
    email: 'gerencia@buensabor.co',
    phone: '+57 312 999 8877',
    documentType: 'NIT',
    documentNumber: '901998877',
    company: 'Restaurante Buen Sabor',
    city: 'Cali',
    notes: 'Cliente ocasional con retiro en tienda.',
  },
  {
    id: 'cus-004',
    kind: 'guest',
    name: 'Juan Perez',
    email: 'juanp@gmail.com',
    phone: '+57 301 456 7721',
    documentType: 'CC',
    documentNumber: '80011223',
    city: 'Bogota',
  },
];

export const products: Product[] = [
  {
    id: 'prd-001',
    sku: 'IMP-1001',
    name: 'Tarjetas premium x1000',
    category: 'Impresion',
    description: 'Tarjeta laminada mate con esquinas rectas y colores de alta fidelidad.',
    price: 165000,
    unit: 'paquete',
    featured: true,
    leadTime: '48 horas',
    stock: 32,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'prd-002',
    sku: 'GRA-2001',
    name: 'Banner gran formato 2x1m',
    category: 'Gran Formato',
    description: 'Lona laminada con estructura ligera para eventos y puntos de venta.',
    price: 98000,
    unit: 'unidad',
    featured: true,
    leadTime: '72 horas',
    stock: 14,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'prd-003',
    sku: 'MER-3002',
    name: 'Tazas corporativas',
    category: 'Merchandising',
    description: 'Ceramica blanca con impresion full color para activaciones y kits.',
    price: 22000,
    unit: 'unidad',
    featured: false,
    leadTime: '4 dias',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'prd-004',
    sku: 'IMP-1050',
    name: 'Flyers A5 x5000',
    category: 'Impresion',
    description: 'Impresion offset para campañas masivas con papel couche brillante.',
    price: 245000,
    unit: 'lote',
    featured: true,
    leadTime: '24 horas',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=1200&auto=format&fit=crop',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'srv-001',
    slug: 'branding-express',
    name: 'Branding express',
    category: 'Branding',
    summary: 'Logo, paleta y mini manual para negocios que necesitan lanzar rapido.',
    turnaround: '5 dias habiles',
    priceFrom: 550000,
    featured: true,
    deliverables: ['Logo principal', 'Versiones color y monocromo', 'Mini manual PDF'],
  },
  {
    id: 'srv-002',
    slug: 'pack-redes',
    name: 'Pack redes sociales',
    category: 'Digital',
    summary: '10 piezas mensuales con adaptaciones para Instagram y Facebook.',
    turnaround: '3 dias habiles',
    priceFrom: 320000,
    featured: true,
    deliverables: ['10 artes editables', 'Versiones feed y story', 'Calendario de publicaciones'],
  },
  {
    id: 'srv-003',
    slug: 'editorial-corporativo',
    name: 'Diseno editorial corporativo',
    category: 'Editorial',
    summary: 'Brochures, dossiers y catalogos con jerarquia visual y preparacion para impresion.',
    turnaround: '7 dias habiles',
    priceFrom: 780000,
    featured: false,
    deliverables: ['Archivo maestro', 'PDF para imprenta', 'Version optimizada web'],
  },
];

export const customRequests: CustomDesignRequest[] = [
  {
    id: 'cdr-001',
    title: 'Sistema visual feria tecnologia',
    customerId: 'cus-001',
    brief: 'Necesitamos piezas para stand, pendones, brochure y material de apoyo para lanzamiento.',
    channels: ['Evento', 'Impresion', 'Pantallas'],
    desiredDueDate: '2026-03-24T20:00:00.000Z',
    status: 'approved',
  },
  {
    id: 'cdr-002',
    title: 'Menu visual temporada',
    customerId: 'cus-003',
    brief: 'Renovar menus impresos y piezas para vitrinas con nueva promo estacional.',
    channels: ['Impresion', 'Punto de venta'],
    desiredDueDate: '2026-03-20T17:00:00.000Z',
    status: 'qualified',
  },
];

export const orders: Order[] = [
  {
    id: 'ord-1001',
    trackingCode: 'GP-24031',
    trackingLinkToken: 'trk-techcorp-24031',
    customerId: 'cus-001',
    origin: 'custom-design',
    createdAt: '2026-03-14T13:00:00.000Z',
    estimatedDelivery: '2026-03-22T17:00:00.000Z',
    deliveryType: 'digital',
    internalStatus: 'in_production',
    publicStatus: 'in_review',
    total: 1650000,
    paymentStatus: 'paid',
    assignedJobId: 'job-001',
    lineItems: [
      {
        id: 'line-001',
        kind: 'custom-design',
        referenceId: 'cdr-001',
        name: 'Sistema visual feria tecnologia',
        quantity: 1,
        unitPrice: 1650000,
      },
    ],
    visibleHistory: [
      {
        id: 'evt-001',
        at: '2026-03-14T13:00:00.000Z',
        internalLabel: 'Solicitud aprobada',
        publicLabel: 'Solicitud recibida',
        visibility: 'public',
        actor: 'Camila Torres',
      },
      {
        id: 'evt-002',
        at: '2026-03-15T10:00:00.000Z',
        internalLabel: 'Trabajo asignado',
        publicLabel: 'Proyecto en desarrollo',
        visibility: 'public',
        actor: 'Camila Torres',
      },
      {
        id: 'evt-003',
        at: '2026-03-16T09:30:00.000Z',
        internalLabel: 'Primera revision interna',
        publicLabel: 'Material en revision',
        visibility: 'public',
        actor: 'Ana Gomez',
      },
    ],
  },
  {
    id: 'ord-1002',
    trackingCode: 'GP-24032',
    trackingLinkToken: 'trk-maria-24032',
    customerId: 'cus-002',
    origin: 'service',
    createdAt: '2026-03-15T09:00:00.000Z',
    estimatedDelivery: '2026-03-18T20:00:00.000Z',
    deliveryType: 'digital',
    internalStatus: 'in_production',
    publicStatus: 'in_design',
    total: 320000,
    paymentStatus: 'paid',
    assignedJobId: 'job-002',
    lineItems: [
      {
        id: 'line-002',
        kind: 'service',
        referenceId: 'srv-002',
        name: 'Pack redes sociales',
        quantity: 1,
        unitPrice: 320000,
      },
    ],
    visibleHistory: [
      {
        id: 'evt-004',
        at: '2026-03-15T09:00:00.000Z',
        internalLabel: 'Servicio pagado',
        publicLabel: 'Pedido confirmado',
        visibility: 'public',
        actor: 'Luis Mejia',
      },
      {
        id: 'evt-005',
        at: '2026-03-15T14:00:00.000Z',
        internalLabel: 'Asignado a diseno',
        publicLabel: 'Equipo creativo trabajando',
        visibility: 'public',
        actor: 'Camila Torres',
      },
    ],
  },
  {
    id: 'ord-1003',
    trackingCode: 'GP-24033',
    trackingLinkToken: 'trk-buensabor-24033',
    customerId: 'cus-003',
    origin: 'product',
    createdAt: '2026-03-15T16:00:00.000Z',
    estimatedDelivery: '2026-03-19T18:00:00.000Z',
    deliveryType: 'pickup',
    internalStatus: 'scheduled',
    publicStatus: 'scheduled',
    total: 245000,
    paymentStatus: 'partial',
    lineItems: [
      {
        id: 'line-003',
        kind: 'product',
        referenceId: 'prd-004',
        name: 'Flyers A5 x5000',
        quantity: 1,
        unitPrice: 245000,
      },
    ],
    visibleHistory: [
      {
        id: 'evt-006',
        at: '2026-03-15T16:00:00.000Z',
        internalLabel: 'Venta registrada',
        publicLabel: 'Pedido recibido',
        visibility: 'public',
        actor: 'Luis Mejia',
      },
      {
        id: 'evt-007',
        at: '2026-03-16T08:30:00.000Z',
        internalLabel: 'Orden enviada a impresion',
        publicLabel: 'Pedido en preparacion',
        visibility: 'public',
        actor: 'Luis Mejia',
      },
    ],
  },
  {
    id: 'ord-1004',
    trackingCode: 'GP-24034',
    trackingLinkToken: 'trk-juan-24034',
    customerId: 'cus-004',
    origin: 'product',
    createdAt: '2026-03-16T11:30:00.000Z',
    estimatedDelivery: '2026-03-18T16:00:00.000Z',
    deliveryType: 'shipping',
    internalStatus: 'quality_control',
    publicStatus: 'ready_for_delivery',
    total: 98000,
    paymentStatus: 'paid',
    lineItems: [
      {
        id: 'line-004',
        kind: 'product',
        referenceId: 'prd-002',
        name: 'Banner gran formato 2x1m',
        quantity: 1,
        unitPrice: 98000,
      },
    ],
    visibleHistory: [
      {
        id: 'evt-008',
        at: '2026-03-16T11:30:00.000Z',
        internalLabel: 'Orden pagada',
        publicLabel: 'Pago confirmado',
        visibility: 'public',
        actor: 'Luis Mejia',
      },
      {
        id: 'evt-009',
        at: '2026-03-16T15:00:00.000Z',
        internalLabel: 'Control de calidad finalizado',
        publicLabel: 'Pedido listo para entrega',
        visibility: 'public',
        actor: 'Camila Torres',
      },
    ],
  },
];

export const creativeJobs: CreativeJob[] = [
  {
    id: 'job-001',
    orderId: 'ord-1001',
    requestId: 'cdr-001',
    title: 'Sistema visual feria tecnologia',
    customerId: 'cus-001',
    designerId: 'usr-designer-1',
    assignedById: 'usr-admin-1',
    assignedAt: '2026-03-15T10:00:00.000Z',
    dueDate: '2026-03-21T20:00:00.000Z',
    priority: 'high',
    status: 'review',
    internalNotes: [
      'Validar versiones para pendon y brochure.',
      'Ajustar contraste de titulares para stand principal.',
    ],
    files: [
      {
        id: 'del-001',
        name: 'Moodboard.pdf',
        type: 'preview',
        size: '4.1 MB',
        uploadedAt: '2026-03-15T16:30:00.000Z',
        visibleToCustomer: true,
      },
      {
        id: 'del-002',
        name: 'Propuesta-v2.fig',
        type: 'preview',
        size: '18 MB',
        uploadedAt: '2026-03-16T09:20:00.000Z',
        visibleToCustomer: false,
      },
    ],
    timeline: [
      {
        id: 'evt-job-001',
        at: '2026-03-15T10:00:00.000Z',
        internalLabel: 'Asignado a Ana Gomez',
        publicLabel: 'Proyecto asignado',
        visibility: 'internal',
        actor: 'Camila Torres',
      },
      {
        id: 'evt-job-002',
        at: '2026-03-16T09:30:00.000Z',
        internalLabel: 'Pasa a revision interna',
        publicLabel: 'Material en revision',
        visibility: 'public',
        actor: 'Ana Gomez',
      },
    ],
  },
  {
    id: 'job-002',
    orderId: 'ord-1002',
    title: 'Pack redes sociales marzo',
    customerId: 'cus-002',
    designerId: 'usr-designer-2',
    assignedById: 'usr-admin-1',
    assignedAt: '2026-03-15T14:00:00.000Z',
    dueDate: '2026-03-18T20:00:00.000Z',
    priority: 'medium',
    status: 'in_progress',
    internalNotes: [
      'Pendiente aprobacion de copys.',
    ],
    files: [
      {
        id: 'del-003',
        name: 'preview-feed-01.jpg',
        type: 'preview',
        size: '1.2 MB',
        uploadedAt: '2026-03-16T13:00:00.000Z',
        visibleToCustomer: true,
      },
    ],
    timeline: [
      {
        id: 'evt-job-003',
        at: '2026-03-15T14:00:00.000Z',
        internalLabel: 'Asignado a Mateo Ruiz',
        publicLabel: 'Proyecto programado',
        visibility: 'internal',
        actor: 'Camila Torres',
      },
      {
        id: 'evt-job-004',
        at: '2026-03-16T08:00:00.000Z',
        internalLabel: 'Inicio de produccion',
        publicLabel: 'Equipo creativo trabajando',
        visibility: 'public',
        actor: 'Mateo Ruiz',
      },
    ],
  },
];

export const inventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    sku: 'PAP-C300',
    name: 'Papel couche 300g',
    stock: 180,
    reserved: 40,
    minimumStock: 120,
    location: 'Bodega A1',
    updatedAt: '2026-03-16T10:00:00.000Z',
  },
  {
    id: 'inv-002',
    sku: 'LON-FLEX',
    name: 'Lona flex premium',
    stock: 20,
    reserved: 9,
    minimumStock: 25,
    location: 'Bodega B3',
    updatedAt: '2026-03-16T11:15:00.000Z',
  },
  {
    id: 'inv-003',
    sku: 'SUB-TAZA',
    name: 'Tazas blancas sublimables',
    stock: 130,
    reserved: 25,
    minimumStock: 50,
    location: 'Bodega C2',
    updatedAt: '2026-03-15T18:00:00.000Z',
  },
];

export const payments: Payment[] = [
  {
    id: 'pay-001',
    orderId: 'ord-1001',
    amount: 1650000,
    method: 'transfer',
    createdAt: '2026-03-14T13:30:00.000Z',
    receivedById: 'usr-cashier-1',
  },
  {
    id: 'pay-002',
    orderId: 'ord-1002',
    amount: 320000,
    method: 'card',
    createdAt: '2026-03-15T09:10:00.000Z',
    receivedById: 'usr-cashier-1',
  },
  {
    id: 'pay-003',
    orderId: 'ord-1003',
    amount: 120000,
    method: 'cash',
    createdAt: '2026-03-15T16:05:00.000Z',
    receivedById: 'usr-cashier-1',
  },
];

export const cashSessions: CashSession[] = [
  {
    id: 'cash-001',
    cashierId: 'usr-cashier-1',
    openedAt: '2026-03-16T08:00:00.000Z',
    status: 'open',
    openingAmount: 250000,
    expectedAmount: 1148000,
    movements: [
      {
        id: 'mov-001',
        type: 'opening',
        amount: 250000,
        label: 'Apertura de caja',
        at: '2026-03-16T08:00:00.000Z',
      },
      {
        id: 'mov-002',
        type: 'sale',
        amount: 320000,
        label: 'Pago pedido GP-24032',
        at: '2026-03-16T09:10:00.000Z',
      },
      {
        id: 'mov-003',
        type: 'sale',
        amount: 98000,
        label: 'Pago banner express',
        at: '2026-03-16T11:35:00.000Z',
      },
    ],
  },
];

export const portalSections: PortalSection[] = [
  { id: 'sec-001', label: 'Hero principal', status: 'published', updatedAt: '2026-03-15T12:00:00.000Z' },
  { id: 'sec-002', label: 'Productos destacados', status: 'published', updatedAt: '2026-03-15T12:10:00.000Z' },
  { id: 'sec-003', label: 'Galeria y testimonios', status: 'draft', updatedAt: '2026-03-14T18:00:00.000Z' },
];

export const testimonials = [
  {
    id: 'tst-001',
    quote: 'Pasamos de cotizar por WhatsApp a tener seguimiento claro y entregables siempre a tiempo.',
    author: 'Paula Leon',
    company: 'TechCorp SAS',
  },
  {
    id: 'tst-002',
    quote: 'La experiencia combina venta rapida con un proceso creativo muy ordenado.',
    author: 'Carlos Mejia',
    company: 'Buen Sabor',
  },
];

export const portfolioHighlights = [
  {
    id: 'prt-001',
    title: 'Lanzamiento de stand corporativo',
    tag: 'Evento + branding',
  },
  {
    id: 'prt-002',
    title: 'Coleccion de piezas para retail',
    tag: 'Impresion gran formato',
  },
  {
    id: 'prt-003',
    title: 'Campana digital estacional',
    tag: 'Redes sociales',
  },
];

export function getCustomerById(customerId: string) {
  return customers.find((customer) => customer.id === customerId);
}

export function getInternalUserById(userId: string) {
  return internalUsers.find((user) => user.id === userId);
}

export function getOrderByTracking(term: string) {
  const normalized = term.trim().toLowerCase();
  return orders.find((order) => {
    return (
      order.trackingCode.toLowerCase() === normalized ||
      order.trackingLinkToken.toLowerCase() === normalized
    );
  });
}

export function getOrdersForCustomer(customerId: string) {
  return orders.filter((order) => order.customerId === customerId);
}

export function getJobsForCustomer(customerId: string) {
  return creativeJobs.filter((job) => job.customerId === customerId);
}

export function getJobsForDesigner(designerId: string) {
  return creativeJobs.filter((job) => job.designerId === designerId);
}

export function getFrequentCustomerByEmail(email: string) {
  return customers.find(
    (customer): customer is FrequentCustomer =>
      customer.kind === 'account' && customer.email.toLowerCase() === email.toLowerCase(),
  );
}
