import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-tarea-dialog',
  standalone:true,
  templateUrl: './crear-tarea-dialog.component.html',
  styleUrls: ['./crear-tarea-dialog.component.scss'],
  imports:[MatDialogModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule]
})
export class CrearTareaDialogComponent implements OnInit {
  form: FormGroup;
  proyectos: any[] = []; // Lista de proyectos para el desplegable
   desarrolladores: any[] = []

  constructor(
    private dialogRef: MatDialogRef<CrearTareaDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_proyecto: ['', Validators.required],
      id_desarrollador: ['', Validators.required], // Este control debe existir
      fecha_limite: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  // Cargar los proyectos para mostrarlos en el desplegable
  this.apiService.getProyectos().subscribe(
    (proyectos) => {
      this.proyectos = proyectos;
    },
    (error) => {
      console.error('Error al cargar los proyectos:', error);
    }
  );

  this.apiService.getDevelopers().subscribe(
    (desarrolladores) => {
      // Filtrar desarrolladores que no tienen valores nulos
      this.desarrolladores = desarrolladores.filter(
        (dev) =>
          dev.nombre !== null &&
          dev.correo !== null &&
          dev.fechaContratacion !== null
      );
    },
    (error) => {
      console.error('Error al cargar los desarrolladores:', error);
    }
  );
}


  onSave(): void {
  if (this.form.valid) {
    const formData = this.form.value;

    const tareaData = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      id_proyecto: formData.id_proyecto,
      id_desarrollador: formData.id_desarrollador, // ID del desarrollador seleccionado
      fecha_limite: formData.fecha_limite,
    };

    console.log('Datos enviados al backend:', tareaData); // Depuración
    this.dialogRef.close(tareaData); // Cierra el modal y envía los datos al componente padre
  }
}

  onCancel(): void {
    this.dialogRef.close(); // Cierra el modal sin enviar datos
  }
}
