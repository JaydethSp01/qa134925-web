"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { mesas as mesasIniciales, type Mesa } from "@/lib/mock";

const ZONAS = ["Interior", "Terraza", "VIP", "Barra", "Jardín"];
const ESTADOS = ["disponible", "ocupada", "reservada"] as const;

const estadoBadge: Record<Mesa["estado"], string> = {
  disponible: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  ocupada: "bg-red-100 text-red-700 border border-red-200",
  reservada: "bg-amber-100 text-amber-700 border border-amber-200",
};

const estadoLabel: Record<Mesa["estado"], string> = {
  disponible: "Disponible",
  ocupada: "Ocupada",
  reservada: "Reservada",
};

type FormData = Omit<Mesa, "id">;

const formVacio: FormData = {
  numero: 0,
  capacidad: 2,
  zona: "Interior",
  estado: "disponible",
};

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>(mesasIniciales);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mesaEditando, setMesaEditando] = useState<Mesa | null>(null);
  const [form, setForm] = useState<FormData>(formVacio);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [confirmEliminar, setConfirmEliminar] = useState<string | null>(null);

  const mesasFiltradas = (mesas ?? []).filter((m) => {
    const coincideBusqueda =
      String(m.numero).includes(busqueda) ||
      m.zona.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "todos" || m.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const abrirCrear = () => {
    setMesaEditando(null);
    setForm(formVacio);
    setMostrarFormulario(true);
  };

  const abrirEditar = (mesa: Mesa) => {
    setMesaEditando(mesa);
    setForm({
      numero: mesa.numero,
      capacidad: mesa.capacidad,
      zona: mesa.zona,
      estado: mesa.estado,
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setMesaEditando(null);
    setForm(formVacio);
  };

  const guardar = () => {
    if (!form.numero || form.numero <= 0) return;
    if (mesaEditando) {
      setMesas((prev) =>
        (prev ?? []).map((m) =>
          m.id === mesaEditando.id ? { ...mesaEditando, ...form } : m
        )
      );
    } else {
      const nueva: Mesa = {
        id: `mesa-${Date.now()}`,
        ...form,
      };
      setMesas((prev) => [...prev, nueva]);
    }
    cerrarFormulario();
  };

  const eliminar = (id: string) => {
    setMesas((prev) => (prev ?? []).filter((m) => m.id !== id));
    setConfirmEliminar(null);
  };

  const conteo = {
    total: mesas?.length,
    disponible: (mesas ?? []).filter((m) => m.estado === "disponible").length,
    ocupada: (mesas ?? []).filter((m) => m.estado === "ocupada").length,
    reservada: (mesas ?? []).filter((m) => m.estado === "reservada").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-10">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">ReservaRest</p>
                <p className="text-xs text-gray-400">Panel de gestión</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/mesa"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Mesas
            </Link>
            <Link
              href="/cliente"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Clientes
            </Link>
            <Link
              href="/reserva"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservas
            </Link>
          </nav>
          <div className="px-4 py-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">RP</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">Roberto Pérez</p>
                <p className="text-xs text-gray-400">Administrador</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="ml-64 flex-1 p-8">
          {/* Cabecera */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Mesas</h1>
              <p className="text-sm text-gray-500 mt-1">
                {mesas?.length} mesas registradas en el restaurante
              </p>
            </div>
            <button
              onClick={abrirCrear}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Mesa
            </button>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{conteo.total}</p>
              <p className="text-xs text-gray-400 mt-1">mesas en total</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Disponibles</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">{conteo.disponible}</p>
              <p className="text-xs text-gray-400 mt-1">listas para reservar</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-red-600 uppercase tracking-wide">Ocupadas</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{conteo.ocupada}</p>
              <p className="text-xs text-gray-400 mt-1">con clientes ahora</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Reservadas</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{conteo.reservada}</p>
              <p className="text-xs text-gray-400 mt-1">con reserva asignada</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por número o zona..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Estado:</span>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="todos">Todos</option>
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="reservada">Reservada</option>
              </select>
            </div>
            <p className="text-sm text-gray-400 whitespace-nowrap">
              {mesasFiltradas?.length} resultado{mesasFiltradas?.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Nº Mesa
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Zona
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Capacidad
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Estado
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mesasFiltradas?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                        </svg>
                        <p className="text-sm text-gray-400">No se encontraron mesas</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  (mesasFiltradas ?? []).map((mesa) => (
                    <tr key={mesa.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-sm">{mesa.numero}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">Mesa {mesa.numero}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{mesa.zona}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{mesa.capacidad} personas</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoBadge[mesa.estado]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            mesa.estado === "disponible" ? "bg-emerald-500" :
                            mesa.estado === "ocupada" ? "bg-red-500" : "bg-amber-500"
                          }`} />
                          {estadoLabel[mesa.estado]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => abrirEditar(mesa)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => setConfirmEliminar(mesa.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal formulario */}
      {mostrarFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={cerrarFormulario}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {mesaEditando ? "Editar Mesa" : "Nueva Mesa"}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {mesaEditando
                    ? `Modificando Mesa ${mesaEditando.numero}`
                    : "Añade una nueva mesa al restaurante"}
                </p>
              </div>
              <button
                onClick={cerrarFormulario}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Número de mesa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.numero || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, numero: Number(e.target.value) }))
                    }
                    placeholder="Ej: 12"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Capacidad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={form.capacidad}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, capacidad: Number(e.target.value) }))
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Zona
                </label>
                <select
                  value={form.zona}
                  onChange={(e) => setForm((f) => ({ ...f, zona: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                >
                  {(ZONAS ?? []).map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(ESTADOS ?? []).map((estado) => (
                    <button
                      key={estado}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, estado }))}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                        form.estado === estado
                          ? estadoBadge[estado] + " ring-2 ring-offset-1 " + (
                              estado === "disponible" ? "ring-emerald-400" :
                              estado === "ocupada" ? "ring-red-400" : "ring-amber-400"
                            )
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {estadoLabel[estado]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={cerrarFormulario}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                disabled={!form.numero || form.numero <= 0}
                className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {mesaEditando ? "Guardar cambios" : "Crear mesa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmación eliminar */}
      {confirmEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmEliminar(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Eliminar mesa</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Esta acción no se puede deshacer. La mesa será eliminada permanentemente del sistema.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmEliminar(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminar(confirmEliminar)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}