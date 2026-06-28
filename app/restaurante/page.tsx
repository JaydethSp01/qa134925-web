"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { restaurantes as mockRestaurantes } from "@/lib/mock";

type Restaurante = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  capacidadTotal: number;
  horarioApertura: string;
  horarioCierre: string;
  activo: boolean;
};

const camposVacios: Omit<Restaurante, "id"> = {
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  capacidadTotal: 0,
  horarioApertura: "08:00",
  horarioCierre: "23:00",
  activo: true,
};

export default function RestaurantePage() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>(mockRestaurantes);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState<Restaurante | null>(null);
  const [form, setForm] = useState<Omit<Restaurante, "id">>(camposVacios);
  const [errores, setErrores] = useState<Partial<Record<keyof Omit<Restaurante, "id">, string>>>({});
  const [confirmEliminar, setConfirmEliminar] = useState<number | null>(null);

  const abrirCrear = () => {
    setEditando(null);
    setForm(camposVacios);
    setErrores({});
    setModalAbierto(true);
  };

  const abrirEditar = (r: Restaurante) => {
    setEditando(r);
    setForm({
      nombre: r.nombre,
      direccion: r.direccion,
      telefono: r.telefono,
      email: r.email,
      capacidadTotal: r.capacidadTotal,
      horarioApertura: r.horarioApertura,
      horarioCierre: r.horarioCierre,
      activo: r.activo,
    });
    setErrores({});
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEditando(null);
    setForm(camposVacios);
    setErrores({});
  };

  const validar = (): boolean => {
    const nuevosErrores: Partial<Record<keyof Omit<Restaurante, "id">, string>> = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria.";
    if (!form.telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nuevosErrores.email = "Ingresa un email válido.";
    if (!form.capacidadTotal || form.capacidadTotal < 1)
      nuevosErrores.capacidadTotal = "La capacidad debe ser mayor a 0.";
    if (!form.horarioApertura) nuevosErrores.horarioApertura = "Requerido.";
    if (!form.horarioCierre) nuevosErrores.horarioCierre = "Requerido.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardar = () => {
    if (!validar()) return;
    if (editando) {
      setRestaurantes((prev) =>
        (prev ?? []).map((r) => (r.id === editando.id ? { ...form, id: editando.id } : r))
      );
    } else {
      const nuevoId = restaurantes?.length > 0 ? Math.max(...restaurantes.map((r) => r.id)) + 1 : 1;
      setRestaurantes((prev) => [...prev, { ...form, id: nuevoId }]);
    }
    cerrarModal();
  };

  const eliminar = (id: number) => {
    setRestaurantes((prev) => (prev ?? []).filter((r) => r.id !== id));
    setConfirmEliminar(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "capacidadTotal" ? Number(value) : value,
    }));
    if (errores[name as keyof typeof errores]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Gestión de Restaurantes</h1>
              <p className="text-xs text-gray-500">Administra la información de tu local</p>
            </div>
          </div>
          <nav className="flex items-center gap-1 text-sm">
            {[
              { href: "/restaurante", label: "Restaurante" },
              { href: "/mesas", label: "Mesas" },
              { href: "/clientes", label: "Clientes" },
              { href: "/reservas", label: "Reservas" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  item.href === "/restaurante"
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total locales</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{restaurantes?.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Locales activos</p>
            <p className="mt-1 text-3xl font-bold text-green-600">{(restaurantes ?? []).filter((r) => r.activo).length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Capacidad total</p>
            <p className="mt-1 text-3xl font-bold text-orange-600">
              {(restaurantes ?? []).reduce((acc, r) => acc + r.capacidadTotal, 0)}
              <span className="text-base font-normal text-gray-400 ml-1">personas</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Listado de restaurantes</h2>
              <p className="text-sm text-gray-500 mt-0.5">{restaurantes?.length} registros encontrados</p>
            </div>
            <button
              onClick={abrirCrear}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nuevo restaurante
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Horario</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Capacidad</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(restaurantes ?? []).map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">{r.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate">{r.direccion}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-800">{r.telefono}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{r.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{r.horarioApertura} – {r.horarioCierre}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-7 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                        {r.capacidadTotal}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${r.activo ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${r.activo ? "bg-green-500" : "bg-gray-400"}`} />
                        {r.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => abrirEditar(r)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-orange-600 bg-gray-100 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => setConfirmEliminar(r.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {restaurantes?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-500">No hay restaurantes registrados</p>
                        <button onClick={abrirCrear} className="text-sm text-orange-600 hover:underline font-medium">
                          Crear el primero
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cerrarModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {editando ? "Editar restaurante" : "Nuevo restaurante"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {editando ? `Modificando: ${editando.nombre}` : "Completa los campos para registrar un local"}
                </p>
              </div>
              <button
                onClick={cerrarModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre del restaurante <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej. La Buena Mesa"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.nombre ? "border-red-300 bg-red-50 focus:border-red-400" : "border-gray-200 bg-white focus:border-orange-400"}`}
                />
                {errores.nombre && <p className="mt-1 text-xs text-red-500">{errores.nombre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Ej. Av. Corrientes 1234, CABA"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.direccion ? "border-red-300 bg-red-50 focus:border-red-400" : "border-gray-200 bg-white focus:border-orange-400"}`}
                />
                {errores.direccion && <p className="mt-1 text-xs text-red-500">{errores.direccion}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+54 11 4000-0000"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.telefono ? "border-red-300 bg-red-50 focus:border-red-400" : "border-gray-200 bg-white focus:border-orange-400"}`}
                  />
                  {errores.telefono && <p className="mt-1 text-xs text-red-500">{errores.telefono}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contacto@restaurante.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.email ? "border-red-300 bg-red-50 focus:border-red-400" : "border-gray-200 bg-white focus:border-orange-400"}`}
                  />
                  {errores.email && <p className="mt-1 text-xs text-red-500">{errores.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Apertura <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="horarioApertura"
                    value={form.horarioApertura}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.horarioApertura ? "border-red-300 bg-red-50" : "border-gray-200 bg-white focus:border-orange-400"}`}
                  />
                  {errores.horarioApertura && <p className="mt-1 text-xs text-red-500">{errores.horarioApertura}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cierre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="horarioCierre"
                    value={form.horarioCierre}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.horarioCierre ? "border-red-300 bg-red-50" : "border-gray-200 bg-white focus:border-orange-400"}`}
                  />
                  {errores.horarioCierre && <p className="mt-1 text-xs text-red-500">{errores.horarioCierre}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Capacidad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="capacidadTotal"
                    value={form.capacidadTotal === 0 ? "" : form.capacidadTotal}
                    onChange={handleChange}
                    min={1}
                    placeholder="0"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-orange-300 ${errores.capacidadTotal ? "border-red-300 bg-red-50" : "border-gray-200 bg-white focus:border-orange-400"}`}
                  />
                  {errores.capacidadTotal && <p className="mt-1 text-xs text-red-500">{errores.capacidadTotal}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">Estado del local</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {form.activo ? "El restaurante acepta reservas actualmente" : "El restaurante está pausado"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, activo: !prev.activo }))}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${form.activo ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${form.activo ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button
                onClick={cerrarModal}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                className="px-5 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm"
              >
                {editando ? "Guardar cambios" : "Crear restaurante"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmEliminar !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmEliminar(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Eliminar restaurante</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Esta acción no se puede deshacer. El restaurante y toda su configuración serán eliminados permanentemente.
                </p>
                <p className="text-sm font-medium text-gray-700 mt-2">¿Estás seguro de continuar?</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmEliminar(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminar(confirmEliminar)}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-sm"
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