import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-modal-developer-info',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule
  ],
 templateUrl: './modal-developer-info.component.html',
})
export class ModalDeveloperInfoComponent {
    tasks: any[] = [];
  displayedColumns: string[] = [
    'nombre',
    'correo',
    'rol',
    'fechaContratacion',
  ];

  constructor(
    private dialogRef: MatDialogRef<ModalDeveloperInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public developer: any,  private apiService: ApiService
  ) {}

   ngOnInit(): void {
    console.log('Desarrollador seleccionado:', this.developer);
    this.loadTasks();
  }
  
 loadTasks(): void {
  const url = `http://localhost:9000/tareas/desarrollador/${this.developer.id}`;
  console.log('Consultando tareas con URL:', url);

  this.apiService.getTareasByDesarrolladorId(this.developer.id).subscribe(
    (data: any[]) => {
      console.log('Tareas recibidas:', data); // Verificar los datos
      this.tasks = data.map(task => task.titulo); // Extraer títulos
    },
    (error: any) => {
      console.error('Error al cargar las tareas del desarrollador:', error);
      this.tasks = []; // Asegúrate de inicializar como vacío en caso de error
    }
  );
}


  onClose(): void {
    this.dialogRef.close();
  }

 
}
