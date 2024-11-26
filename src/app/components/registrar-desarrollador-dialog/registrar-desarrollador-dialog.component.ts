import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-registrar-desarrollador-dialog',
  templateUrl: './registrar-desarrollador-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
})
export class RegistrarDesarrolladorDialogComponent implements OnInit {
  form: FormGroup;
  roles: any[] = []; // Lista de roles cargados desde el backend

  constructor(
    private dialogRef: MatDialogRef<RegistrarDesarrolladorDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService // Servicio para interactuar con el backend
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required], // Select para rol
      fechaContratacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar roles al inicializar el componente
    this.apiService.getRoles().subscribe(
      (roles) => {
        this.roles = roles; // Asignar los roles obtenidos
      },
      (error) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

onSave(): void {
  if (this.form.valid) {
    const formData = this.form.value;

    const developerData = {
      nombre: formData.nombre,
      correo: formData.email,
      id_rol: formData.rol,
      fecha_contratacion: formData.fechaContratacion, // Nota: Asegúrate de que coincida con el backend
    };

    console.log('Datos enviados:', developerData); // Depuración
    this.dialogRef.close(developerData);
  }
}

  onCancel(): void {
    this.dialogRef.close();
  }
}
