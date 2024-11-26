import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { ApiService } from '../../api.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-editar-desarrollador',
  templateUrl: './editar-desarrollador.component.html',
   imports: [
    // otros módulos que ya tienes
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule
  ],
})
export class EditarDesarrolladorComponent {
  editForm: FormGroup;
  roles: any[] = []; 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarDesarrolladorComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  this.editForm = this.fb.group({
    nombre: [data.nombre, Validators.required],
    email: [data.correo, [Validators.required, Validators.email]], // Cambiar 'correo' en lugar de 'email' si corresponde
    rol: [data.rol?.nombre || '', Validators.required], // Extraer 'nombre' del rol
    fechaContratacion: [
      data.fechaContratacion ? new Date(data.fechaContratacion).toISOString().split('T')[0] : '',
      Validators.required, 
    ], // Formatea la fecha a un formato ISO (YYYY-MM-DD)
  });
}

  // Cargar los roles desde el backend
 ngOnInit(): void {
    this.loadRoles(); // Cargar los roles al iniciar el componente
  }

  // Cargar los roles desde el backend
  loadRoles(): void {
    this.apiService.getRoles().subscribe(
      (roles: any[]) => {
        this.roles = roles;
        console.log('Roles cargados:', this.roles);

        // Verificar si el rol actual está en la lista
        const currentRole = this.roles.find((rol) => rol.nombre === this.editForm.value.rol);
        if (currentRole) {
          this.editForm.patchValue({ rol: currentRole.nombre }); // Configurar el rol actual como seleccionado
        }
      },
      (error: any) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }
 onSave(): void {
    if (this.editForm.valid) {
      const selectedRole = this.roles.find((r) => r.nombre === this.editForm.value.rol);
      const updatedData = {
        nombre: this.editForm.value.nombre,
        correo: this.editForm.value.email,
        id_rol: selectedRole ? selectedRole.id : null, // Obtener el ID del rol seleccionado
      };
       console.log('Datos enviados al padre:', updatedData);
      this.dialogRef.close(updatedData); // Enviar los datos al componente padre
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }

  
}

