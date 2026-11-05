"use client";

import { useOrder } from "./OrderProvider";

type Props = {
  handle?: string;
  className?: string;
  children: React.ReactNode;
  box?: boolean;
  label?: string;
};

export default function OrderButton({ handle, className = "btn-primary", children, box, label }: Props) {
  const { open } = useOrder();
  return (
    <button type="button" className={className} onClick={() => open({ handle, box })} aria-label={label}>
      {children}
    </button>
  );
}
