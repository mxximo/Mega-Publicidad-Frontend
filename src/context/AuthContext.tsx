import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getFrequentCustomerByEmail, internalUsers } from '../data/mockData';
import { getPermissionsForRole } from '../lib/permissions';
import type { FrequentCustomer, InternalUser, Permission } from '../types/domain';

type SessionKind = 'employee' | 'customer' | null;

interface StoredSession {
  id: string;
  kind: Exclude<SessionKind, null>;
}

interface AuthContextType {
  user: InternalUser | FrequentCustomer | null;
  sessionKind: SessionKind;
  loginEmployee: (email: string, password: string) => { ok: boolean; error?: string };
  loginCustomer: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  isEmployee: boolean;
  isCustomer: boolean;
}

const STORAGE_KEY = 'grafica-pro-session';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function restoreSession(): InternalUser | FrequentCustomer | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const session = JSON.parse(raw) as StoredSession;

    if (session.kind === 'employee') {
      return internalUsers.find((user) => user.id === session.id) ?? null;
    }

    const customer = getFrequentCustomerByEmail(session.id);
    return customer ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<InternalUser | FrequentCustomer | null>(() => restoreSession());
  const [sessionKind, setSessionKind] = useState<SessionKind>(() => {
    const restored = restoreSession();
    if (!restored) {
      return null;
    }

    return 'role' in restored ? 'employee' : 'customer';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!user || !sessionKind) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const payload: StoredSession =
      sessionKind === 'employee'
        ? { id: user.id, kind: sessionKind }
        : { id: user.email, kind: sessionKind };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [sessionKind, user]);

  const value = useMemo<AuthContextType>(() => {
    return {
      user,
      sessionKind,
      loginEmployee: (email, password) => {
        const employee = internalUsers.find(
          (candidate) =>
            candidate.email.toLowerCase() === email.trim().toLowerCase() &&
            candidate.password === password,
        );

        if (!employee) {
          return { ok: false, error: 'Credenciales no validas para empleados.' };
        }

        setUser(employee);
        setSessionKind('employee');
        return { ok: true };
      },
      loginCustomer: (email, password) => {
        const customer = getFrequentCustomerByEmail(email);
        if (!customer || customer.password !== password) {
          return { ok: false, error: 'No encontramos una cuenta de cliente con esos datos.' };
        }

        setUser(customer);
        setSessionKind('customer');
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        setSessionKind(null);
      },
      hasPermission: (permission) => {
        if (!user || sessionKind !== 'employee' || !('role' in user)) {
          return false;
        }

        return getPermissionsForRole(user.role).includes(permission);
      },
      isEmployee: sessionKind === 'employee',
      isCustomer: sessionKind === 'customer',
    };
  }, [sessionKind, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
