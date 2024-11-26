import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Project, Developers, Task } from '../../models/interfaces';

@Component({
  selector: 'app-listado-proyectos',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './listado-proyectos.component.html',
  styleUrls: ['./listado-proyectos.component.scss']
})
export class ListadoProyectosComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getProjects();
  }

getProjects(): void {
  this.apiService.getProyectos().subscribe(
    (data: any[]) => {
      // Transformar los datos recibidos de la API para adaptarlos a las nuevas interfaces
      this.projects = data
        .filter((project) => project.nombre && project.nombre.trim().length > 0) // Filtrar proyectos sin nombre
        .map((project): Project => ({
          id: project.id || 0, // Asignar 0 si `id` es null
          name: project.nombre, // Asumimos que aquí el nombre ya no es null por el filtro
          description: project.descripcion || 'Sin descripción',
          startDate: project.fecha_inicio || 'Fecha no definida',
          endDate: project.fecha_fin || null, // Permitir `null` si no existe
          responsible: {
            id: project.responsable?.id || 0, // Validar que `responsable` exista
            name: project.responsable?.nombre || 'Sin responsable',
            email: project.responsable?.correo || 'Correo no disponible',
          },
          developers: (project.desarrolladores || []).map((dev: any) => ({
            desarrolladorId: dev.desarrolladorId || 0,
            proyectoId: dev.proyectoId || 0,
            desarrollador: {
              id: dev.desarrollador?.id || 0,
              name: dev.desarrollador?.nombre || 'Sin nombre',
              email: dev.desarrollador?.correo || 'Correo no disponible',
            },
          })),
          tasks: (project.tareas || []).map((task: any): Task => ({
            id: task.id || 0,
            title: task.titulo || 'Tarea sin título',
            description: task.descripcion || 'Sin descripción',
            deadline: task.fecha_limite || 'Sin fecha límite',
            creationDate: task.fecha_creacion || 'Fecha no definida',
            updateDate: task.fecha_actualizacion || 'Fecha no definida',
            project: {
              id: task.proyecto?.id || 0,
              description: task.proyecto?.descripcion || 'Sin descripción',
              name: task.proyecto?.nombre || 'Sin nombre',
              startDate: task.proyecto?.fecha_inicio || 'Fecha no definida',
              endDate: task.proyecto?.fecha_fin || null,
            },
            developer: {
              id: task.desarrollador?.id || 0,
              name: task.desarrollador?.nombre || 'Sin nombre',
              email: task.desarrollador?.correo || 'Correo no disponible',
            },
            status: {
              id: task.estado?.id || 0,
              name: task.estado?.nombre || 'Estado no definido',
            },
          })),
          status: this.getProjectStatus(project), // Determina el estado del proyecto
        }));

      this.filteredProjects = [...this.projects];
    },
    (error) => {
      console.error('Error fetching projects:', error);
    }
  );
}


  getProjectStatus(project: any): string {
    // Implementa la lógica para determinar el estado del proyecto
    if (!project.fecha_fin) {
      return 'En progreso';
    }
    return 'Completado';
  }

  filterProjects(status: string): void {
    if (status === 'Todos') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((project) => project.status === status);
    }
  }

  searchProject(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(input)
    );
  }

  goToProyecto(id: number): void {
    this.router.navigate([`/proyecto/${id}`]); // Navegar a la ruta del proyecto específico
  }
}
