import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearTareaDialogComponent } from '../crear-tarea-dialog/crear-tarea-dialog.component';
import { AddDevelopersDialogComponent } from '../add-developers-dialog/add-developers-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatInputModule],
})
export class ProyectoComponent implements OnInit {
  proyecto: any; // Información del proyecto
  tareas: any[] = []; // Lista de tareas del proyecto
  desarrolladores: any[] = []; // Lista de desarrolladores del proyecto
   estados: any[] = [];
   selectedEstado: { [key: number]: number } = {};

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
    this.loadEstados();

     this.apiService.getEstados().subscribe(
    (estados) => {
      this.estados = estados; // Guardar los estados en una variable
    },
    (error) => {
      console.error('Error al obtener estados:', error);
    }
  );
  }

   loadEstados(): void {
    this.apiService.getEstados().subscribe(
      (data) => {
        this.estados = data;
      },
      (error) => {
        console.error('Error al cargar estados:', error);
      }
    );
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
  changeTaskState(tarea: any, newStateId: number): void {
  this.apiService.updateTarea(tarea.id, { id_estado: newStateId }).subscribe(
    (response) => {
      console.log('Estado de la tarea actualizado:', response);
      this.loadTareas(this.proyecto.id); // Recargar tareas para actualizar la lista
    },
    (error) => {
      console.error('Error al actualizar estado de la tarea:', error);
    }
  );
}

  // Cargar tareas asociadas al proyecto
 loadTareas(idProyecto: number): void {
  this.apiService.getTareasByProyecto(idProyecto).subscribe(
    (data) => {
      this.tareas = data.map((task: any) => ({
        id: task.id,
        titulo: task.titulo,
        estado: task.estado,
        developer: task.desarrollador,
        fecha_limite: task.fecha_limite ? new Date(task.fecha_limite): new Date(task.fecha_limite)// Convertir a objeto Date
          ? {
              id: task.desarrollador.id,
              name: task.desarrollador.nombre,
              email: task.desarrollador.correo,

            }
          : null, // Si no hay desarrollador asignado
      }));

      // Inicializar selectedEstado con el estado actual de cada tarea
      this.tareas.forEach((tarea) => {
        this.selectedEstado[tarea.id] = tarea.estado.id; // Usa el id del estado actual
      });
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

updateTarea(tarea: any): void {
  const updatedData = {
    titulo: tarea.titulo, // Nuevo título
    fecha_limite: tarea.fecha_limite ? new Date(tarea.fecha_limite).toISOString() : null, // Fecha límite formateada
  };

  this.apiService.updateTarea(tarea.id, updatedData).subscribe(
    (response) => {
      console.log('Tarea actualizada:', response);
      this.loadTareas(this.proyecto.id); // Recargar tareas
    },
    (error) => {
      console.error('Error al actualizar la tarea:', error);
    }
  );
}
}
