import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../api.service'; // Importar el servicio

@Component({
  selector: 'app-editar-tarea-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './editar-tarea-dialog.component.html',
  styleUrls: ['./editar-tarea-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Configurar idioma
  ],
})
export class EditarTareaDialogComponent implements OnInit {
  tarea: any;
  developers: any[] = []; // Lista de desarrolladores disponibles

  constructor(
    public dialogRef: MatDialogRef<EditarTareaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService // Inyectar el servicio
  ) {
    this.tarea = { ...data };
  }

  ngOnInit(): void {
    this.loadDevelopers(); // Cargar desarrolladores al iniciar
  }

  loadDevelopers(): void {
  this.apiService.getDevelopers().subscribe(
    (data) => {
      this.developers = data.filter(
        (developer) => developer.nombre && developer.nombre.trim() !== ''
      );
    },
    (error) => {
      console.error('Error al cargar desarrolladores:', error);
    }
  );
}

guardar(): void {
  // Comparar los valores iniciales con los editados
  const cambios: any = {};
  if (this.tarea.titulo !== this.data.titulo) cambios.titulo = this.tarea.titulo;
  if (this.tarea.descripcion !== this.data.descripcion) cambios.descripcion = this.tarea.descripcion;
  if (this.tarea.fecha_limite !== this.data.fecha_limite) cambios.fecha_limite = this.tarea.fecha_limite;
  if (this.tarea.developer?.id !== this.data.developer?.id) cambios.desarrollador = { id: this.tarea.developer.id };
  if (this.tarea.estado?.id !== this.data.estado?.id) cambios.estado = { id: this.tarea.estado.id };

  console.log('Datos modificados enviados al backend:', cambios); // Depuración
  this.dialogRef.close(cambios); // Solo envía los campos modificados
}

  cancelar(): void {
    this.dialogRef.close();
  }

  compareDevelopers(developer1: any, developer2: any): boolean {
  return developer1 && developer2 ? developer1.id === developer2.id : developer1 === developer2;
}
}
