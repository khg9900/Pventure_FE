import React from "react";

interface SectionFieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

export default function SectionField({ icon, label, children }: SectionFieldProps) {
  return (
    <section className="mb-6">
      <h3 className="font-semibold text-[var(--color-text-main)] mb-3 flex items-center gap-2">
        <span className="text-[var(--color-primary)]">{icon}</span>
        {label}
      </h3>
      {children}
    </section>
  );
}
