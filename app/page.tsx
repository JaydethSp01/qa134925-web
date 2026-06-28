"use client";
export const dynamic = "force-dynamic";
import { Hero } from "@/components/ui/Hero";
import { POSBoard } from "@/components/ui/POSBoard";
import Link from "next/link";
import { reservas, mesas, clientes } from "@/lib/mock";

const estadoBadge: Record<string, string> = {
  confirmada: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  pendiente: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  cancelada: "bg-red-100 text-red-600 ring-1 ring-red-200",
  completada: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
};

interface MetricCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  accent: string;
}

function MetricCard({ label, value, sub, icon, accent }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
      <Hero title="Resumen del día" subtitle="Resumen de tu operación de un vistazo." />
      <div className="mt-2"><h2 className="mb-3 text-lg font-semibold text-slate-900">Vista rápida</h2><POSBoard /></div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-400 mt-1.5">{sub}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const hoy = new Date().toISOString().split("T")[0];
  const reservasHoy = (reservas ?? []).filter((r) => r.fecha === hoy);
  const confirmadas = (reservasHoy ?? []).filter((r) => r.estado === "confirmada").length;
  const pendientes = (reservasHoy ?? []).filter((r) => r.estado === "pendiente").length;
  const mesasOcupadas = (mesas ?? []).filter((m) => m.estado === "ocupada").length;
  const mesasLibres = (mesas ?? []).filter((m) => m.estado === "libre").length;
  const ocupacionPct = mesas?.length > 0 ? Math.round((mesasOcupadas / mesas?.length) * 100) : 0;
  const personasHoy = (reservasHoy ?? []).reduce((acc, r) => acc + r.personas, 0);

  const fechaFormateada = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar + Main layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">La Piazza</p>
                <p className="text-xs text-gray-400 mt-0.5">Restaurante</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {[
              {
                href: "/",
                label: "Dashboard",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                active: true,
              },
              {
                href: "/reservas",
                label: "Reservas",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                active: false,
              },
              {
                href: "/mesas",
                label: "Mesas",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                ),
                active: false,
              },
              {
                href: "/clientes",
                label: "Clientes",
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                active: false,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                MA
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">María Alonso</p>
                <p className="text-xs text-gray-400 truncate">Recepcionista</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-8 max-w-6xl mx-auto">
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resumen del día</h1>
                <p className="text-sm text-gray-500 mt-1 capitalize">{fechaFormateada}</p>
              </div>
              <Link
                href="/reservas/nueva"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nueva reserva
              </Link>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                label="Reservas hoy"
                value={reservasHoy?.length}
                sub={`${confirmadas} confirmadas · ${pendientes} pendientes`}
                accent="bg-indigo-50 text-indigo-500"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
              <MetricCard
                label="Comensales hoy"
                value={personasHoy}
                sub={`personas esperadas`}
                accent="bg-violet-50 text-violet-500"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
              />
              <MetricCard
                label="Mesas libres"
                value={mesasLibres}
                sub={`de ${mesas?.length} mesas en total`}
                accent="bg-emerald-50 text-emerald-500"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <MetricCard
                label="Ocupación actual"
                value={`${ocupacionPct}%`}
                sub={`${mesasOcupadas} mesas ocupadas`}
                accent="bg-orange-50 text-orange-500"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
            </div>

            {/* Reservations table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Próximas reservas</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{reservas?.length} reservas en el sistema</p>
                </div>
                <Link
                  href="/reservas"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  Ver todas →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/70 border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Fecha · Hora
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Mesa
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Pax
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Notas
                      </th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {reservas.slice(0, 8).map((reserva) => {
                      const cliente = (clientes ?? []).find((c) => c.id === reserva.clienteId);
                      const mesa = (mesas ?? []).find((m) => m.id === reserva.mesaId);
                      return (
                        <tr key={reserva.id} className="hover:bg-gray-50/60 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs flex-shrink-0">
                                {cliente?.nombre
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("") ?? "?"}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{cliente?.nombre ?? "—"}</p>
                                <p className="text-xs text-gray-400">{cliente?.telefono ?? ""}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-900 font-medium">
                              {new Date(reserva.fecha + "T00:00:00").toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                            <p className="text-xs text-gray-400 font-mono">{reserva.hora}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">Mesa {mesa?.numero ?? "—"}</p>
                            <p className="text-xs text-gray-400 capitalize">{mesa?.zona ?? ""}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 text-gray-700">
                              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {reserva.personas}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                estadoBadge[reserva.estado] ?? "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {reserva.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-[160px]">
                            <p className="text-gray-400 text-xs truncate">{reserva.notas || "—"}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/reservas/${reserva.id}`}
                              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Ver →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Mostrando {Math.min(reservas?.length, 8)} de {reservas?.length} reservas
                </p>
                <Link
                  href="/reservas"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Ver listado completo →
                </Link>
              </div>
            </div>

            {/* Bottom row: mesas quick view */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Mesas estado */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Estado de mesas</h3>
                  <Link href="/mesas" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    Gestionar →
                  </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {(mesas ?? []).map((mesa) => (
                    <div
                      key={mesa.id}
                      className={`rounded-xl p-3 text-center border transition-all ${
                        mesa.estado === "libre"
                          ? "bg-emerald-50 border-emerald-200"
                          : mesa.estado === "ocupada"
                          ? "bg-red-50 border-red-200"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <p
                        className={`text-sm font-bold ${
                          mesa.estado === "libre"
                            ? "text-emerald-700"
                            : mesa.estado === "ocupada"
                            ? "text-red-700"
                            : "text-amber-700"
                        }`}
                      >
                        {mesa.numero}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          mesa.estado === "libre"
                            ? "text-emerald-500"
                            : mesa.estado === "ocupada"
                            ? "text-red-500"
                            : "text-amber-500"
                        }`}
                      >
                        {mesa.capacidad}p
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    Libre
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    Ocupada
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    Reservada
                  </span>
                </div>
              </div>

              {/* Clientes recientes */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Clientes frecuentes</h3>
                  <Link href="/clientes" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    Ver todos →
                  </Link>
                </div>
                <div className="space-y-3">
                  {clientes.slice(0, 5).map((cliente) => {
                    const numReservas = (reservas ?? []).filter((r) => r.clienteId === cliente.id).length;
                    return (
                      <div key={cliente.id} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-700 font-semibold text-xs flex-shrink-0">
                          {cliente.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{cliente.nombre}</p>
                          <p className="text-xs text-gray-400 truncate">{cliente.email}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-gray-900">{numReservas}</p>
                          <p className="text-xs text-gray-400">reservas</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}