export type Role = 'admin' | 'cashier' | 'designer';

export type Permission =
  | 'dashboard.view'
  | 'orders.view'
  | 'orders.manage'
  | 'pos.use'
  | 'inventory.view'
  | 'inventory.manage'
  | 'customers.view'
  | 'customers.manage'
  | 'production.view'
  | 'production.assign'
  | 'production.update'
  | 'settings.view'
  | 'settings.manage';

export type CustomerKind = 'guest' | 'account';
export type DocumentType = 'CC' | 'NIT' | 'CE' | 'Passport';
export type ProductCategory = 'Impresion' | 'Merchandising' | 'Gran Formato';
export type ServiceCategory = 'Branding' | 'Digital' | 'Editorial' | 'Publicidad';
export type OrderOrigin = 'product' | 'service' | 'custom-design';
export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type PublicTrackingStatus =
  | 'received'
  | 'scheduled'
  | 'in_design'
  | 'in_review'
  | 'ready_for_delivery'
  | 'completed';
export type InternalOrderStatus =
  | 'quotation'
  | 'paid'
  | 'scheduled'
  | 'in_production'
  | 'quality_control'
  | 'ready'
  | 'closed';
export type CreativeJobStatus =
  | 'requested'
  | 'assigned'
  | 'in_progress'
  | 'review'
  | 'delivery'
  | 'closed';
export type Priority = 'high' | 'medium' | 'low';
export type DeliveryType = 'digital' | 'pickup' | 'shipping';

export interface InternalUser {
  id: string;
  name: string;
  role: Role;
  email: string;
  password: string;
  title: string;
  avatar: string;
  activeJobs: number;
}

export interface BaseCustomer {
  id: string;
  kind: CustomerKind;
  name: string;
  email: string;
  phone: string;
  documentType: DocumentType;
  documentNumber: string;
  company?: string;
  city: string;
  notes?: string;
}

export interface GuestCustomer extends BaseCustomer {
  kind: 'guest';
}

export interface FrequentCustomer extends BaseCustomer {
  kind: 'account';
  password: string;
  memberSince: string;
}

export type Customer = GuestCustomer | FrequentCustomer;

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  unit: string;
  featured: boolean;
  leadTime: string;
  stock: number;
  image: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  summary: string;
  turnaround: string;
  priceFrom: number;
  featured: boolean;
  deliverables: string[];
}

export interface CustomDesignRequest {
  id: string;
  title: string;
  customerId: string;
  brief: string;
  channels: string[];
  desiredDueDate: string;
  status: 'new' | 'qualified' | 'quoted' | 'approved';
}

export interface TrackingEvent {
  id: string;
  at: string;
  internalLabel: string;
  publicLabel: string;
  visibility: 'internal' | 'public';
  actor: string;
}

export interface Deliverable {
  id: string;
  name: string;
  type: 'preview' | 'final';
  size: string;
  uploadedAt: string;
  visibleToCustomer: boolean;
}

export interface CreativeJob {
  id: string;
  orderId: string;
  requestId?: string;
  title: string;
  customerId: string;
  designerId: string;
  assignedById: string;
  assignedAt: string;
  dueDate: string;
  priority: Priority;
  status: CreativeJobStatus;
  internalNotes: string[];
  files: Deliverable[];
  finalDeliverableId?: string;
  timeline: TrackingEvent[];
}

export interface OrderLineItem {
  id: string;
  kind: OrderOrigin;
  referenceId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  createdAt: string;
  receivedById: string;
}

export interface Order {
  id: string;
  trackingCode: string;
  trackingLinkToken: string;
  customerId: string;
  origin: OrderOrigin;
  createdAt: string;
  estimatedDelivery: string;
  deliveryType: DeliveryType;
  internalStatus: InternalOrderStatus;
  publicStatus: PublicTrackingStatus;
  total: number;
  lineItems: OrderLineItem[];
  paymentStatus: 'pending' | 'partial' | 'paid';
  assignedJobId?: string;
  visibleHistory: TrackingEvent[];
}

export interface CashMovement {
  id: string;
  type: 'opening' | 'sale' | 'expense' | 'closing';
  amount: number;
  label: string;
  at: string;
}

export interface CashSession {
  id: string;
  cashierId: string;
  openedAt: string;
  status: 'open' | 'closed';
  openingAmount: number;
  expectedAmount: number;
  movements: CashMovement[];
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reserved: number;
  minimumStock: number;
  location: string;
  updatedAt: string;
}

export interface PortalSection {
  id: string;
  label: string;
  status: 'published' | 'draft';
  updatedAt: string;
}
