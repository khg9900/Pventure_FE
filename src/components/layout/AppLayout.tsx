import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <main>{children}</main>
    </div>
  );
}
