import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'En progreso' | 'Completado' | 'Planificación';
  startDate: string;
  endDate: string;
  developer: string;
  developers:number;
  tasks: number;
}

@Component({
  selector: 'app-listado-proyectos',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    
    ],
  templateUrl: './listado-proyectos.component.html',
  styleUrl: './listado-proyectos.component.scss'
})

export class ListadoProyectosComponent {
   projects: Project[] = [
    { id: 1, name: 'Rediseño de sitio web', description: 'Actualizar el sitio web corporativo', status: 'En progreso', startDate: '2023-01-15', endDate: '2023-06-30', developer:'Juan', developers:5, tasks:4},
    { id: 2, name: 'Aplicación móvil', description: 'Desarrollar app para iOS y Android', status: 'Planificación', startDate: '2023-07-01', endDate: '2024-01-31',  developer:'Juan',  developers:5, tasks:4},
    { id: 3, name: 'Sistema de gestión', description: 'Implementar nuevo ERP', status: 'Completado', startDate: '2022-06-01', endDate: '2023-05-31',  developer:'Juan',  developers:5, tasks:4 },
    { id: 4, name: 'Migración a la nube', description: 'Trasladar infraestructura a AWS', status: 'En progreso', startDate: '2023-03-01', endDate: '2023-08-31',  developer:'Juan',  developers:5, tasks:4},
  ];

  constructor(private router: Router) { }
   filteredProjects = this.projects;

  // Método para filtrar proyectos por estado
  filterProjects(status: string) {
    if (status === 'Todos') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.status === status);
    }
  }

  searchProject(event: Event): void {
  const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.filteredProjects = this.projects.filter(project =>
    project.name.toLowerCase().includes(input)
  );
}

goToProyecto() {
    this.router.navigate(['/proyecto']);
  }
}
