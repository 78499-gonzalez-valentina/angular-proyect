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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.apiService.getTareas().subscribe(
      (data: any[]) => {
        // Transformar los datos recibidos de la API para adaptarlos a la interfaz Task
        this.tasks = data.map((task: any): Task => ({
          id: task.id,
          title: task.titulo,
          description: task.descripcion,
          deadline: task.fecha_limite,
          creationDate: task.fecha_creacion,
          updateDate: task.fecha_actualizacion,
          project: {
            id: task.proyecto.id,
            description: task.proyecto.descripcion,
            name: task.proyecto.nombre,
            startDate: task.proyecto.fecha_inicio,
            endDate: task.proyecto.fecha_fin,
          },
          developer: {
            id: task.desarrollador.id,
            name: task.desarrollador.nombre,
            email: task.desarrollador.correo,
          },
          status: {
            id: task.estado.id,
            name: task.estado.nombre,
          },
        }));

        this.filteredTasks = [...this.tasks];
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  filterTasks(status: string): void {
    if (status === 'Todos') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status.name === status);
    }
  }

  searchTask(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(input)
    );
  }
}
