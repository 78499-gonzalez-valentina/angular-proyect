import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-registrar-proyecto-dialog',
  templateUrl: './registrar-proyecto-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class RegistrarProyectoDialogComponent implements OnInit {
  form: FormGroup;
  responsables: any[] = []; // Lista de responsables obtenida del backend

  constructor(
    private dialogRef: MatDialogRef<RegistrarProyectoDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: [''],
      id_responsable: [''], // Opcional, puede estar vacío
    });
  }

  ngOnInit(): void {
    // Cargar responsables disponibles al inicializar el componente
    this.apiService.getDevelopers().subscribe(
      (developers) => {
        this.responsables = developers;
      },
      (error) => {
        console.error('Error al cargar responsables:', error);
      }
    );
  }

    onSave(): void {
    if (this.form.valid) {
      const projectData = this.form.value;
      console.log('Datos enviados:', projectData); // Depuración

      // Llama al backend para guardar el proyecto
      this.apiService.createProject(projectData).subscribe(
        (response) => {
          console.log('Proyecto registrado:', response);
          this.dialogRef.close(response); // Cierra el diálogo y envía la respuesta al componente padre
        },
        (error) => {
          console.error('Error al registrar el proyecto:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
