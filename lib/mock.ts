export type UbicacionMesa = "interior" | "exterior" | "terraza" | "privado";
export type EstadoMesa = "disponible" | "ocupada" | "reservada" | "mantenimiento";
export type EstadoReserva = "confirmada" | "pendiente" | "cancelada" | "completada" | "no_presentado";

export interface Restaurante {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  capacidadTotal: number;
  horarioApertura: string;
  horarioCierre: string;
  diasCierre: string[];
  descripcion: string;
  logoUrl?: string;
}

export interface Mesa {
  id: string;
  restauranteId: string;
  numero: number;
  capacidad: number;
  ubicacion: UbicacionMesa;
  estado: EstadoMesa;
  descripcion?: string;
  posicionX?: number;
  posicionY?: number;
}

export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaRegistro: string;
  totalReservas: number;
  notas?: string;
  alergias?: string;
  cumpleanos?: string;
}

export interface Reserva {
  id: string;
  clienteId: string;
  mesaId: string;
  restauranteId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  numPersonas: number;
  estado: EstadoReserva;
  motivoCancelacion?: string;
  notas?: string;
  creadaEn: string;
  actualizadaEn: string;
}

export const restaurantes: Restaurante[] = [
  {
    id: "rest-001",
    nombre: "La Terraza del Puerto",
    direccion: "Paseo Marítimo 42",
    ciudad: "Barcelona",
    codigoPostal: "08003",
    telefono: "+34 932 456 789",
    email: "info@terrazadelpuerto.es",
    capacidadTotal: 80,
    horarioApertura: "13:00",
    horarioCierre: "23:30",
    diasCierre: ["lunes"],
    descripcion: "Restaurante de cocina mediterránea con vistas al mar. Especialistas en arroces y mariscos frescos de temporada.",
  },
];

export const mesas: Mesa[] = [
  {
    id: "mesa-001",
    restauranteId: "rest-001",
    numero: 1,
    capacidad: 2,
    ubicacion: "interior",
    estado: "disponible",
    descripcion: "Mesa junto a la ventana, vista al jardín interior",
    posicionX: 10,
    posicionY: 10,
  },
  {
    id: "mesa-002",
    restauranteId: "rest-001",
    numero: 2,
    capacidad: 4,
    ubicacion: "interior",
    estado: "reservada",
    descripcion: "Mesa central del salón principal",
    posicionX: 10,
    posicionY: 30,
  },
  {
    id: "mesa-003",
    restauranteId: "rest-001",
    numero: 3,
    capacidad: 6,
    ubicacion: "interior",
    estado: "ocupada",
    descripcion: "Mesa larga, ideal para grupos familiares",
    posicionX: 10,
    posicionY: 55,
  },
  {
    id: "mesa-004",
    restauranteId: "rest-001",
    numero: 4,
    capacidad: 2,
    ubicacion: "terraza",
    estado: "disponible",
    descripcion: "Terraza con vistas al paseo marítimo",
    posicionX: 60,
    posicionY: 10,
  },
  {
    id: "mesa-005",
    restauranteId: "rest-001",
    numero: 5,
    capacidad: 4,
    ubicacion: "terraza",
    estado: "disponible",
    descripcion: "Terraza semicubierta, apta para lluvia suave",
    posicionX: 60,
    posicionY: 30,
  },
  {
    id: "mesa-006",
    restauranteId: "rest-001",
    numero: 6,
    capacidad: 8,
    ubicacion: "privado",
    estado: "reservada",
    descripcion: "Salón privado con iluminación independiente, perfecto para celebraciones",
    posicionX: 60,
    posicionY: 55,
  },
  {
    id: "mesa-007",
    restauranteId: "rest-001",
    numero: 7,
    capacidad: 4,
    ubicacion: "exterior",
    estado: "mantenimiento",
    descripcion: "Zona exterior en renovación hasta julio",
    posicionX: 85,
    posicionY: 10,
  },
  {
    id: "mesa-008",
    restauranteId: "rest-001",
    numero: 8,
    capacidad: 6,
    ubicacion: "interior",
    estado: "disponible",
    descripcion: "Mesa esquinera tranquila, buena para reuniones de negocio",
    posicionX: 85,
    posicionY: 55,
  },
];

export const clientes: Cliente[] = [
  {
    id: "cli-001",
    nombre: "María",
    apellido: "González Ruiz",
    email: "maria.gonzalez@gmail.com",
    telefono: "+34 612 345 678",
    fechaRegistro: "2024-03-15",
    totalReservas: 12,
    notas: "Cliente habitual. Prefiere mesa en terraza cuando el tiempo lo permite.",
    alergias: "Intolerante al gluten",
    cumpleanos: "1985-07-22",
  },
  {
    id: "cli-002",
    nombre: "Carlos",
    apellido: "Martínez Vega",
    email: "carlos.martinez@empresa.com",
    telefono: "+34 698 765 432",
    fechaRegistro: "2024-06-01",
    totalReservas: 5,
    notas: "Viene frecuentemente con clientes de empresa. Solicita factura siempre.",
    cumpleanos: "1979-11-03",
  },
  {
    id: "cli-003",
    nombre: "Lucía",
    apellido: "Fernández Castro",
    email: "lucia.f.castro@hotmail.com",
    telefono: "+34 677 123 987",
    fechaRegistro: "2025-01-20",
    totalReservas: 3,
    notas: "Reserva siempre para celebraciones familiares. Grupo de 6 a 8 personas.",
    alergias: "Alergia a frutos secos",
    cumpleanos: "1990-02-14",
  },
  {
    id: "cli-004",
    nombre: "Alejandro",
    apellido: "Torres Ibáñez",
    email: "alejandro.torres@outlook.es",
    telefono: "+34 654 987 321",
    fechaRegistro: "2025-03-08",
    totalReservas: 7,
    notas: "Prefiere mesa interior alejada de la entrada. Le gusta el vino blanco de la casa.",
    cumpleanos: "1982-09-17",
  },
  {
    id: "cli-005",
    nombre: "Isabel",
    apellido: "Ramírez Soto",
    email: "isabel.ramirez@gmail.com",
    telefono: "+34 621 456 789",
    fechaRegistro: "2025-05-12",
    totalReservas: 2,
    alergias: "Vegana estricta",
    cumpleanos: "1995-12-30",
  },
  {
    id: "cli-006",
    nombre: "Javier",
    apellido: "López Moreno",
    email: "javier.lopez@icloud.com",
    telefono: "+34 633 214 567",
    fechaRegistro: "2024-11-28",
    totalReservas: 9,
    notas: "Cliente VIP. Celebra aniversario de boda cada septiembre. Solicitar detalle de bienvenida.",
    cumpleanos: "1975-04-05",
  },
  {
    id: "cli-007",
    nombre: "Sofía",
    apellido: "Navarro Blanco",
    email: "sofia.navarro@empresa.net",
    telefono: "+34 689 321 654",
    fechaRegistro: "2026-01-10",
    totalReservas: 1,
    notas: "Primera visita. Recomendada por cliente Javier López.",
  },
  {
    id: "cli-008",
    nombre: "Pablo",
    apellido: "Herrera Díaz",
    email: "pablo.herrera@yahoo.es",
    telefono: "+34 644 789 123",
    fechaRegistro: "2025-08-19",
    totalReservas: 4,
    notas: "Periodista. Realizó reseña positiva del restaurante en 2025.",
    cumpleanos: "1988-06-11",
  },
];

export const reservas: Reserva[] = [
  {
    id: "res-001",
    clienteId: "cli-001",
    mesaId: "mesa-004",
    restauranteId: "rest-001",
    fecha: "2026-06-28",
    horaInicio: "14:00",
    horaFin: "15:30",
    numPersonas: 2,
    estado: "confirmada",
    notas: "Solicita mesa con vistas. Aniversario de pareja.",
    creadaEn: "2026-06-20T10:32:00Z",
    actualizadaEn: "2026-06-20T10:32:00Z",
  },
  {
    id: "res-002",
    clienteId: "cli-002",
    mesaId: "mesa-002",
    restauranteId: "rest-001",
    fecha: "2026-06-28",
    horaInicio: "13:30",
    horaFin: "15:00",
    numPersonas: 4,
    estado: "confirmada",
    notas: "Comida de negocios. Requiere zona tranquila y factura a nombre de empresa.",
    creadaEn: "2026-06-22T09:15:00Z",
    actualizadaEn: "2026-06-22T09:15:00Z",
  },
  {
    id: "res-003",
    clienteId: "cli-003",
    mesaId: "mesa-006",
    restauranteId: "rest-001",
    fecha: "2026-06-29",
    horaInicio: "21:00",
    horaFin: "23:00",
    numPersonas: 8,
    estado: "pendiente",
    notas: "Cumpleaños de la hija. Confirmar tarta sorpresa con cocina.",
    creadaEn: "2026-06-25T17:45:00Z",
    actualizadaEn: "2026-06-25T17:45:00Z",
  },
  {
    id: "res-004",
    clienteId: "cli-004",
    mesaId: "mesa-001",
    restauranteId: "rest-001",
    fecha: "2026-06-27",
    horaInicio: "21:30",
    horaFin: "23:00",
    numPersonas: 2,
    estado: "completada",
    notas: "Sin incidencias. Consumió menú degustación.",
    creadaEn: "2026-06-19T11:00:00Z",
    actualizadaEn: "2026-06-27T23:05:00Z",
  },
  {
    id: "res-005",
    clienteId: "cli-005",
    mesaId: "mesa-005",
    restauranteId: "rest-001",
    fecha: "2026-06-30",
    horaInicio: "13:00",
    horaFin: "14:30",
    numPersonas: 3,
    estado: "confirmada",
    notas: "Menú completamente vegano para todos los comensales.",
    creadaEn: "2026-06-26T14:20:00Z",
    actualizadaEn: "2026-06-26T14:20:00Z",
  },
  {
    id: "res-006",
    clienteId: "cli-006",
    mesaId: "mesa-003",
    restauranteId: "rest-001",
    fecha: "2026-06-26",
    horaInicio: "20:30",
    horaFin: "22:30",
    numPersonas: 6,
    estado: "completada",
    notas: "Reunión familiar. Solicitaron botella de cava de bienvenida.",
    creadaEn: "2026-06-15T08:30:00Z",
    actualizadaEn: "2026-06-26T22:35:00Z",
  },
  {
    id: "res-007",
    clienteId: "cli-007",
    mesaId: "mesa-008",
    restauranteId: "rest-001",
    fecha: "2026-07-02",
    horaInicio: "14:00",
    horaFin: "15:30",
    numPersonas: 4,
    estado: "pendiente",
    notas: "Primera reserva. Confirmar por email 24h antes.",
    creadaEn: "2026-06-28T08:10:00Z",
    actualizadaEn: "2026-06-28T08:10:00Z",
  },
  {
    id: "res-008",
    clienteId: "cli-008",
    mesaId: "mesa-004",
    restauranteId: "rest-001",
    fecha: "2026-06-24",
    horaInicio: "13:30",
    horaFin: "15:00",
    numPersonas: 1,
    estado: "cancelada",
    motivoCancelacion: "El cliente canceló por viaje de trabajo imprevisto. Reembolso no aplica.",
    creadaEn: "2026-06-18T16:00:00Z",
    actualizadaEn: "2026-06-23T09:45:00Z",
  },
];