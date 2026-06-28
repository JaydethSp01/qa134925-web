export const dynamic = "force-dynamic";
import "./globals.css";
import { AppShell } from "@/components/ui/AppShell";

const NAV = [{ href: "/", label: "Inicio" }, { href: "/cliente", label: "Clientes" }, { href: "/mesa", label: "Mesas" }, { href: "/reserva", label: "Reservas" }, { href: "/restaurante", label: "Restaurante" }];

export const metadata = { title: "ReservApp — Gestión de Restaurante", description: "Generado con ScrumDev AI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppShell items={NAV} title="ReservApp — Gestión de Restaurante">{children}</AppShell>
      </body>
    </html>
  );
}
