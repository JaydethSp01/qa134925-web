"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { reservas as mockReservas, mesas as mockMesas, clientes as mockClientes } from "@/lib/mock";

type EstadoReserva = "pendiente" | "confirmada" | "cancelada";

interface Reserva {
  id: number;
  clienteId: number;
  mesaId: number;
  fecha: string;
  hora: string;
  personas: number;
  estado: EstadoReserva;
  notas: string;
}

interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  zona: string;
}

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

const EMPTY_FORM: Omit<Reserva, "id"> = {
  clienteId: 0,
  mesaId: 0,
  fecha: "",
  hora: "",
  personas: 2,
  estado: "pendiente",
  notas: "",
};

const ESTADO_COLORS: Record<EstadoReserva, string> = {
  pendiente: "bg-amber-100 text-amber-800 border border-amber-200",
  confirmada: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  cancelada: "bg-red-100 text-red-800 border border-red-200",
};

const ESTADO_LABEL: Record<EstadoReserva, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

export default function ReservaPage() {
  const [reservas, setReservas] = useState<Reserva[]>(mockReservas);
  const [mesas] = useState<Mesa[]>(mockMesas);
  const [clientes] = useState<Cliente[]>(mockClientes);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Reserva, "id">>(EMPTY_FORM);
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const getClienteNombre = (id: number) =>
    (clientes ?? []).find((c) => c.id === id)?.nombre ?? "—";

  const getMesaNumero = (id: number) =>
    (mesas ?? []).find((m) => m.id === id)?.numero ?? "—";

  const getMesaCapacidad = (id: number) =>
    (mesas ?? []).find((m) => m.id === id)?.capacidad ?? 20;

  const getMesaZona = (id: number) =>
    (mesas ?? []).find((m) => m.id === id)?.zona ?? "";

  const filteredReservas =
    filterEstado === "todos"
      ? reservas
      : (reservas ?? []).filter((r) => r.estado === filterEstado);

  const statConfirmadas = (reservas ?? []).filter((r) => r.estado === "confirmada").length;
  const statPendientes = (reservas ?? []).filter((r) => r.estado === "pendiente").length;
  const statPersonas = reservas
    .filter((r) => r.estado !== "cancelada")
    .reduce((sum, r) => sum + r.personas, 0);

  const handleEdit = (reserva: Reserva) => {
    setEditingId(reserva.id);
    setForm({
      clienteId: reserva.clienteId,
      mesaId: reserva.mesaId,
      fecha: reserva.fecha,
      hora: reserva.hora,
      personas: reserva.personas,
      estado: reserva.estado,
      notas: reserva.notas,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setReservas((prev) =>
        (prev ?? []).map((r) => (r.id === editingId ? { ...form, id: editingId } : r))
      );
    } else {
      const newId = Math.max(0, ...reservas.map((r) => r.id)) + 1;
      setReservas((prev) => [...prev, { ...form, id: newId }]);
    }
    handleCancel();
  };

  const handleDelete = (id: number) => {
    setReservas((prev) => (prev ?? []).filter((r) => r.id !== id));
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Panel principal
            </Link>
            <span className="text-gray-300">/</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Reservas</h1>
              <p className="text-xs text-gray-500 mt-0.5">Gestión de reservas del restaurante</p>
            </div>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nueva reserva
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total reservas</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{reservas?.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Confirmadas</p>
            <p className="text-4xl font-bold text-emerald-600 mt-2">{statConfirmadas}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pendientes</p>
            <p className="text-4xl font-bold text-amber-500 mt-2">{statPendientes}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Comensales</p>
            <p className="text-4xl font-bold text-indigo-600 mt-2">{statPersonas}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-500 mr-1">Filtrar por estado:</span>
          {(["todos", "pendiente", "confirmada", "cancelada"] as const).map((e) => (
            <button
              key={e}
              onClick={() => setFilterEstado(e)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filterEstado === e
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {e === "todos" ? "Todos" : ESTADO_LABEL[e]}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-medium">
            {filteredReservas?.length} resultado{filteredReservas?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["#", "Cliente", "Mesa / Zona", "Fecha", "Hora", "Personas", "Estado", "Notas", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReservas?.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">Sin reservas con este filtro</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  (filteredReservas ?? []).map((reserva) => (
                    <tr key={reserva.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-5 py-4 text-xs font-mono text-gray-400 font-medium">
                        #{reserva.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                            {getClienteNombre(reserva.clienteId).charAt(0).toUpperCase()}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            {getClienteNombre(reserva.clienteId)}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">
                            Mesa {getMesaNumero(reserva.mesaId)}
                          </span>
                          <span className="text-gray-400 text-xs ml-1.5">
                            {getMesaZona(reserva.mesaId)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Cap. {getMesaCapacidad(reserva.mesaId)} personas
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {new Date(reserva.fecha + "T00:00:00").toLocaleDateString("es-ES", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {reserva.hora}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-semibold">{reserva.personas}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${ESTADO_COLORS[reserva.estado]}`}
                        >
                          {ESTADO_LABEL[reserva.estado]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500 max-w-[180px]">
                        <span className="truncate block" title={reserva.notas || ""}>
                          {reserva.notas || <span className="text-gray-300">—</span>}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(reserva)}
                            title="Editar reserva"
                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(reserva.id)}
                            title="Eliminar reserva"
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId !== null ? "Editar reserva" : "Nueva reserva"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editingId !== null ? `Modificando reserva #${editingId}` : "Completa los datos de la reserva"}
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.clienteId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, clienteId: Number(e.target.value) }))
                    }
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value={0} disabled>
                      Seleccionar cliente…
                    </option>
                    {(clientes ?? []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Mesa <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.mesaId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, mesaId: Number(e.target.value) }))
                    }
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value={0} disabled>
                      Seleccionar mesa…
                    </option>
                    {(mesas ?? []).map((m) => (
                      <option key={m.id} value={m.id}>
                        Mesa {m.numero} — {m.zona} ({m.capacidad} personas)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Fecha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.fecha}
                    onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Hora <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={form.hora}
                    onChange={(e) => setForm((f) => ({ ...f, hora: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Personas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={form.mesaId ? getMesaCapacidad(form.mesaId) : 20}
                    value={form.personas}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, personas: Number(e.target.value) }))
                    }
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {form.mesaId > 0 && (
                    <p className="text-xs text-gray-400 mt-1.5">
                      Capacidad máxima de la mesa: {getMesaCapacidad(form.mesaId)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Estado
                  </label>
                  <select
                    value={form.estado}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, estado: e.target.value as EstadoReserva }))
                    }
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Notas
                </label>
                <textarea
                  rows={3}
                  value={form.notas}
                  onChange={(e) => setForm((f) => ({ ...f, notas: e.target.value }))}
                  placeholder="Alergias, ocasión especial, preferencias de ubicación…"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
                >
                  {editingId !== null ? "Guardar cambios" : "Crear reserva"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Eliminar reserva</h3>
                <p className="text-sm text-gray-500 mt-1">
                  ¿Confirmas que deseas eliminar la reserva{" "}
                  <span className="font-semibold text-gray-800">#{confirmDeleteId}</span>? Esta
                  acción no se puede deshacer.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
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