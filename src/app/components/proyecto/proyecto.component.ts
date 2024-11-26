import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'; // Asegúrate de que este servicio exista y tenga un método para obtener proyectos
import { Project } from '../../models/interfaces';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MatChipsModule, MatCardModule, CommonModule],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
})
export class ProyectoComponent implements OnInit {
  project: Project | null = null; // Proyecto actual cargado

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId) {
      this.getProjectDetails(projectId);
    } else {
      console.error('ID de proyecto no válido.');
    }
  }

  // Método para obtener el proyecto por ID desde la API
 getProjectDetails(id: number): void {
  this.apiService.getProyectoById(id).subscribe(
    (projectDto: Project) => {
      this.project = {
        id: projectDto.id,
        name: projectDto.name || 'Nombre no definido',
        description: projectDto.description || 'Sin descripción',
        startDate: projectDto.startDate || 'Fecha de inicio no definida',
        endDate: projectDto.endDate || null,
        responsible: {
          id: projectDto.responsible?.id || 0,
          name: projectDto.responsible?.name || 'Sin responsable',
          email: projectDto.responsible?.email || 'Correo no definido',
        },
        developers: (projectDto.developers || []).map((dev) => ({
          desarrolladorId: dev.desarrolladorId,
          proyectoId: dev.proyectoId,
          desarrollador: {
            id: dev.desarrollador?.id || 0,
            name: dev.desarrollador?.name || 'Sin nombre',
            email: dev.desarrollador?.email || 'Sin correo',
          },
        })),
        tasks: (projectDto.tasks || []).map((task) => ({
          id: task.id,
          title: task.title || 'Título no definido',
          description: task.description || 'Sin descripción',
          deadline: task.deadline || null
        })),
        status: projectDto.endDate ? 'Completado' : 'En progreso',
      };
    },
    (error) => {
      console.error('Error al obtener el proyecto:', error);
    }
  );
}
}