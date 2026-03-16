import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import RequireSession from './components/auth/RequireSession';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import Catalog from './pages/public/Catalog';
import Services from './pages/public/Services';
import CustomDesign from './pages/public/CustomDesign';
import TrackOrder from './pages/public/TrackOrder';
import Contact from './pages/public/Contact';
import CustomerLogin from './pages/account/CustomerLogin';
import CustomerDashboard from './pages/account/CustomerDashboard';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import POS from './pages/admin/POS';
import Orders from './pages/admin/Orders';
import ProductionBoard from './pages/admin/ProductionBoard';
import Inventory from './pages/admin/Inventory';
import Customers from './pages/admin/Customers';
import Settings from './pages/admin/Settings';

function AdminIndexRedirect() {
  const { user } = useAuth();

  if (!user || !('role' in user)) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === 'cashier') {
    return <Navigate to="/admin/pos" replace />;
  }

  return <Navigate to="/admin/production" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/custom-design" element={<CustomDesign />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account/login" element={<CustomerLogin />} />
            <Route
              path="/account"
              element={
                <RequireSession mode="customer">
                  <CustomerDashboard />
                </RequireSession>
              }
            />
          </Route>

          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireSession mode="employee">
                <AdminLayout />
              </RequireSession>
            }
          >
            <Route index element={<AdminIndexRedirect />} />
            <Route
              path="dashboard"
              element={
                <RequireSession mode="employee" permission="dashboard.view">
                  <Dashboard />
                </RequireSession>
              }
            />
            <Route
              path="orders"
              element={
                <RequireSession mode="employee" permission="orders.view">
                  <Orders />
                </RequireSession>
              }
            />
            <Route
              path="pos"
              element={
                <RequireSession mode="employee" permission="pos.use">
                  <POS />
                </RequireSession>
              }
            />
            <Route
              path="production"
              element={
                <RequireSession mode="employee" permission="production.view">
                  <ProductionBoard />
                </RequireSession>
              }
            />
            <Route
              path="inventory"
              element={
                <RequireSession mode="employee" permission="inventory.view">
                  <Inventory />
                </RequireSession>
              }
            />
            <Route
              path="customers"
              element={
                <RequireSession mode="employee" permission="customers.view">
                  <Customers />
                </RequireSession>
              }
            />
            <Route
              path="settings"
              element={
                <RequireSession mode="employee" permission="settings.view">
                  <Settings />
                </RequireSession>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
