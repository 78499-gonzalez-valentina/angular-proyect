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

interface Developer {
  desarrolladorId: number;
  proyectoId: number;
  desarrollador: {
    id: number;
    name: string;
    email: string;
  };
}

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  responsible: {
    id: number;
    name: string;
    email: string;
  };
  developers: Developer[];
  tasks: Task[];
  status: string;
}

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
        // Transformar los datos recibidos de la API para adaptarlos a la interfaz
        this.projects = data.map((project): Project => ({
          id: project.id,
          name: project.nombre,
          description: project.descripcion,
          startDate: project.fecha_inicio,
          endDate: project.fecha_fin,
          responsible: {
            id: project.responsable.id,
            name: project.responsable.nombre,
            email: project.responsable.correo,
          },
          developers: project.desarrolladores.map((dev: any): Developer => ({
            desarrolladorId: dev.desarrolladorId,
            proyectoId: dev.proyectoId,
            desarrollador: {
              id: dev.desarrollador.id,
              name: dev.desarrollador.nombre,
              email: dev.desarrollador.correo,
            },
          })),
          tasks: project.tareas.map((task: any): Task => ({
            id: task.id,
            title: task.titulo,
            description: task.descripcion,
            deadline: task.fecha_limite,
          })),
          status: this.getProjectStatus(project), // Puedes implementar lógica para el estado
        }));

        this.filteredProjects = [...this.projects];
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  getProjectStatus(project: any): string {
    // Implementar lógica para determinar el estado del proyecto
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
    this.router.navigate([`/proyecto/${id}`]); // Navegar a la ruta del proyecto especifico
  }
}
