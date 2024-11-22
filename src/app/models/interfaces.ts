export interface Developers {
  id: number;
  nombre: string;
  correo: string;
  rol: {
    id: number;
    nombre: string;
    descripcion?: string;
  } | null;  // Puede ser `null` si el rol no está definido
  fechaContratacion: Date;
}

export interface Task {
  id: number;
  title: string; // "titulo" en la API
  description: string; // "descripcion" en la API
  deadline: string; // "fecha_limite" en la API
  creationDate: string; // "fecha_creacion" en la API
  updateDate: string; // "fecha_actualizacion" en la API
  project: {
    id: number;
    description: string;
    name: string;
    startDate: string;
    endDate: string | null;
  };
  developer: {
    id: number;
    name: string;
    email: string;
  };
  status: {
    id: number;
    name: string; // Estado de la tarea ("Pendiente", "En progreso", "Completado", etc.)
  };
}

export interface Project {
  id: number;
  name: string; // "nombre" en la API
  description: string; // "descripcion" en la API
  startDate: string; // "fecha_inicio" en la API
  endDate: string | null; // "fecha_fin" en la API
  responsible: {
    id: number;
    name: string; // "nombre" del responsable
    email: string; // "correo" del responsable
  };
  developers: {
    desarrolladorId: number;
    proyectoId: number;
    desarrollador: {
      id: number;
      name: string; // "nombre" del desarrollador
      email: string; // "correo" del desarrollador
    };
  }[];
  tasks: {
    id: number;
    title: string; // "titulo" en la API
    description: string; // "descripcion" en la API
    deadline: string; // "fecha_limite" en la API
  }[];
  status: string; // Para determinar el estado del proyecto (puede ser un campo calculado)
}