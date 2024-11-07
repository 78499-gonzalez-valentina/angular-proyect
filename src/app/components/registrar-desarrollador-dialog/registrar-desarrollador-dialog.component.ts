import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-registrar-desarrollador-dialog',
  standalone:true,
  imports: [MatTableModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule, MatInputModule],
  template: `
  <div style="padding: 40px;">
    <h1 mat-dialog-title style="font-size: 25px; color: #3d3d3d;">Registrar Desarrollador</h1>
    <div mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field style="margin: 5px; " appearance="outline">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="nombre" required>
        </mat-form-field>

        <mat-form-field style="margin: 5px; " appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" required>
        </mat-form-field>

        <mat-form-field style="margin: 5px; " appearance="outline">
          <mat-label>Rol</mat-label>
          <input matInput formControlName="rol" required>
        </mat-form-field>

        <mat-form-field style="margin: 5px;  " appearance="outline">
          <mat-label  style="color: #3B2229" >Fecha de contratación</mat-label>
          <input matInput style="color: #3B2229" formControlName="fechaContratacion" required type="date">
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions >
      <button  style="color: #3B2229" mat-button (click)="onCancel()">Cancelar</button>
      <button  style="color: #3B2229" mat-raised-button (click)="onSave()" [disabled]="form.invalid">Guardar</button>
    </div>
</div>
  `
})
export class RegistrarDesarrolladorDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegistrarDesarrolladorDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      fechaContratacion: ['', Validators.required]
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
