import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearTareaDialogComponent } from '../crear-tarea-dialog/crear-tarea-dialog.component';
import { AddDevelopersDialogComponent } from '../add-developers-dialog/add-developers-dialog.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule],
})
export class ProyectoComponent implements OnInit {
  proyecto: any; // Información del proyecto
  tareas: any[] = []; // Lista de tareas del proyecto
  desarrolladores: any[] = []; // Lista de desarrolladores del proyecto

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog // Inyección de MatDialog
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
  const dialogRef = this.dialog.open(CrearTareaDialogComponent, {
    width: '500px',
    data: { idProyecto: this.proyecto?.id, nombreProyecto: this.proyecto?.nombre }, // Pasar datos del proyecto
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // Sobrescribir el ID del proyecto con el proyecto actual
      const tareaConProyecto = { ...result, idProyecto: this.proyecto?.id };

      this.apiService.createTarea(tareaConProyecto).subscribe(
        (response) => {
          console.log('Tarea creada:', response);

          // Actualizar la lista de tareas
          this.loadTareas(this.proyecto?.id);
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    }
  });
}

  // Método para agregar desarrolladores
openAddDevelopersDialog(): void {
  const dialogRef = this.dialog.open(AddDevelopersDialogComponent, {
    width: '500px',
    data: { currentDevelopers: this.desarrolladores },
  });

  dialogRef.afterClosed().subscribe((selectedDevelopersIds: number[]) => {
    if (selectedDevelopersIds && selectedDevelopersIds.length > 0) {
      // Crear un array de desarrolladores basado en los IDs seleccionados
      const newDevelopers = selectedDevelopersIds.map((id) => ({
        id,
      }));

      // Actualizar el proyecto con los nuevos desarrolladores
      const updatedProyecto = {
        ...this.proyecto,
        desarrolladores: [...this.desarrolladores, ...newDevelopers], // Agregar los nuevos
      };

      this.apiService.updateProyecto(this.proyecto.id, updatedProyecto).subscribe(
        (response) => {
          console.log('Proyecto actualizado con nuevos desarrolladores:', response);
          this.loadDesarrolladores(this.proyecto.id); // Recargar la lista de desarrolladores
        },
        (error) => {
          console.error('Error al actualizar el proyecto:', error);
        }
      );
    }
  });
}
}
