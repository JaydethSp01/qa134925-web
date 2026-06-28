"use client";
export const dynamic = "force-dynamic";
import { useState, useMemo } from "react";
import Link from "next/link";
import { clientes as mockClientes, type Cliente } from "@/lib/mock";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [confirmEliminar, setConfirmEliminar] = useState<number | null>(null);

  const formVacio: Omit<Cliente, "id" | "fechaRegistro" | "totalReservas"> = {
    nombre: "",
    email: "",
    telefono: "",