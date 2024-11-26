import { Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service'; // Asegúrate de que el path sea correcto
import { Developers, Task, Project } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: { name: string }[] = [];
  developers: { name: string }[] = [];
  tasks: { title: string }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadDevelopers();
    this.loadTasks();
  }

 loadProjects(): void {
    this.apiService.getProyectos().subscribe(
      (data: any[]) => {
        this.projects = data
          .map((project) => ({
            name: project.nombre, // Mapea "nombre" a "name"
          }))
          .slice(0, 3); // Limita a los primeros 3 elementos
      },
      (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }


  loadDevelopers(): void {
    this.apiService.getDevelopers().subscribe((data: Developers[]) => {
      this.developers = data.map((developer) => ({ name: developer.nombre })).slice(0, 3); // Solo los 3 primeros
    });
  }

  loadTasks(): void {
    this.apiService.getTareas().subscribe(
      (data: any[]) => {
        this.tasks = data
          .map((task) => ({
            title: task.titulo, // Mapea "titulo" a "title"
          }))
          .slice(0, 3); // Limita a los primeros 3 elementos
      },
      (error) => {
        console.error('Error al obtener tareas:', error);
      }
    );
  }
}

