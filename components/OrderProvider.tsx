"use client";

import { createContext, useCallback, useContext, useState } from "react";
import OrderModal from "./OrderModal";

type OpenArgs = { handle?: string; box?: boolean };
type Ctx = { open: (args?: OpenArgs) => void };

const OrderContext = createContext<Ctx>({ open: () => {} });

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<(OpenArgs & { id: number }) | null>(null);

  const open = useCallback((args: OpenArgs = {}) => setRequest({ ...args, id: Date.now() }), []);

  return (
    <OrderContext.Provider value={{ open }}>
      {children}
      <OrderModal request={request} onClose={() => setRequest(null)} />
    </OrderContext.Provider>
  );
}
