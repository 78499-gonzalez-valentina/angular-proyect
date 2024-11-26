import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../api.service';
import { Task } from '../../models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { CrearTareaDialogComponent } from '../crear-tarea-dialog/crear-tarea-dialog.component';



@Component({
  selector: 'app-listado-tareas',
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
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.scss']
})
export class ListadoTareasComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
  this.getTasks();
}


getTasks(): void {
  this.apiService.getTareas().subscribe(
    (data: any[]) => {
      this.tasks = data.map((task: any): Task => ({
        id: task.id,
        title: task.titulo || 'Tarea sin título',
        description: task.descripcion || 'Sin descripción',
        deadline: task.fecha_limite || 'Sin fecha límite',
        creationDate: task.fecha_creacion || 'Fecha no disponible',
        updateDate: task.fecha_actualizacion || 'Fecha no disponible',
        project: {
          id: task.proyecto?.id || 0,
          description: task.proyecto?.descripcion || 'Proyecto no disponible',
          name: task.proyecto?.nombre || 'Sin proyecto',
          startDate: task.proyecto?.fecha_inicio || null,
          endDate: task.proyecto?.fecha_fin || null,
        },
        developer: task.desarrollador
          ? {
              id: task.desarrollador.id,
              name: task.desarrollador.nombre,
              email: task.desarrollador.correo,
            }
          : { id: 0, name: 'No asignado', email: 'No asignado' }, // Valores predeterminados
        status: task.estado
          ? {
              id: task.estado.id,
              name: task.estado.nombre,
            }
          : { id: 1, name: 'Pendiente' }, // Valor predeterminado para el estado
      }));

      this.filteredTasks = [...this.tasks]; // Inicializar tareas filtradas
    },
    (error) => {
      console.error('Error fetching tasks:', error);
    }
  );
}

 openCrearTareaDialog(): void {
  const dialogRef = this.dialog.open(CrearTareaDialogComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.apiService.createTarea(result).subscribe(
        (response) => {
          console.log('Tarea creada:', response);
          this.getTasks(); // Recargar tareas
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    }
  });
}

 filterTasks(status: string): void {
  if (status === 'Todos') {
    this.filteredTasks = this.tasks;
  } else {
    this.filteredTasks = this.tasks.filter(task => task.status?.name === status);
  }
}


 searchTask(event: Event): void {
  const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.filteredTasks = this.tasks.filter(task =>
    task.title?.toLowerCase().includes(input)
  );
}
}
