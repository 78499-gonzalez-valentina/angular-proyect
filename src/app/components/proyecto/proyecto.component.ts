import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-proyecto',
  standalone:true,
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class ProyectoComponent implements OnInit {
  proyecto: any; // Información del proyecto
  tareas: any[] = []; // Lista de tareas del proyecto
  desarrolladores: any[] = []; // Lista de desarrolladores del proyecto

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const idProyecto = parseInt(this.route.snapshot.params['id'], 10); // Obtener el ID del proyecto desde la URL
    this.loadProyecto(idProyecto);
    this.loadTareas(idProyecto);
    this.loadDesarrolladores(idProyecto);
  }

  // Cargar información del proyecto
  loadProyecto(idProyecto: number): void {
    this.apiService.getProyectoById(idProyecto).subscribe(
      (data) => {
        this.proyecto = data;
      },
      (error) => {
        console.error('Error al cargar proyecto:', error);
      }
    );
  }

  // Cargar tareas asociadas al proyecto
  loadTareas(idProyecto: number): void {
    this.apiService.getTareasByProyecto(idProyecto).subscribe(
      (data) => {
        this.tareas = data;
      },
      (error) => {
        console.error('Error al cargar tareas:', error);
      }
    );
  }

  // Cargar desarrolladores asociados al proyecto
  loadDesarrolladores(idProyecto: number): void {
    this.apiService.getDesarrolladoresByProyecto(idProyecto).subscribe(
      (data) => {
        this.desarrolladores = data;
      },
      (error) => {
        console.error('Error al cargar desarrolladores:', error);
      }
    );
  }

  // Método para agregar tareas
  addTarea(): void {
    // Implementación futura para agregar tareas
  }

  // Método para agregar desarrolladores
  addDesarrollador(): void {
    // Implementación futura para agregar desarrolladores
  }
}
