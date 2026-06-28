"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SectionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inicio" />
      <EmptyState title="Inicio" description="Sección en preparación." />
    </div>
  );
}
