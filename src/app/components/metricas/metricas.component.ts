import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

// Definir el tipo Project
interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  developer: string;
  developers: number;
  tasks: number;
}

@Component({
  selector: 'app-metrics',
  standalone:true,
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss'],
  imports:[MatCardModule],
})
export class MetricasComponent implements OnInit {
  // Array de proyectos
  projects: Project[] = [
    { id: 1, name: 'Rediseño de sitio web', description: 'Actualizar el sitio web corporativo', status: 'En progreso', startDate: '2023-01-15', endDate: '2023-06-30', developer: 'Juan', developers: 5, tasks: 4 },
    { id: 2, name: 'Aplicación móvil', description: 'Desarrollar app para iOS y Android', status: 'Planificación', startDate: '2023-07-01', endDate: '2024-01-31', developer: 'Juan', developers: 5, tasks: 4 },
    { id: 3, name: 'Sistema de gestión', description: 'Implementar nuevo ERP', status: 'Completado', startDate: '2022-06-01', endDate: '2023-05-31', developer: 'Juan', developers: 5, tasks: 4 },
    { id: 4, name: 'Migración a la nube', description: 'Trasladar infraestructura a AWS', status: 'En progreso', startDate: '2023-03-01', endDate: '2023-08-31', developer: 'Juan', developers: 5, tasks: 4 }
  ];

  // Variables para las métricas
  totalProjects: number = 0;
  completedProjects: number = 0;
  pendingTasks: number = 0;
  activeDevelopers: number = 0;
  avgTasksPerProject: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.calculateMetrics();
  }

  // Calcular las métricas
  calculateMetrics(): void {
    this.totalProjects = this.projects.length;
    this.completedProjects = this.projects.filter(project => project.status === 'Completado').length;
    this.pendingTasks = this.projects.reduce((acc, project) => acc + (project.tasks), 0);
    this.activeDevelopers = this.projects.reduce((acc, project) => acc + project.developers, 0);
    this.avgTasksPerProject = this.totalProjects ? (this.pendingTasks / this.totalProjects) : 0;
  }
}