import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-developers-dialog',
  standalone: true,
  templateUrl: './add-developers-dialog.component.html',
  styleUrls: ['./add-developers-dialog.component.scss'],
  imports: [CommonModule, MatListModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class AddDevelopersDialogComponent implements OnInit {
  developers: any[] = []; // Lista original de desarrolladores
  filteredDevelopers: any[] = []; // Lista filtrada que se muestra
  selectedDevelopers: number[] = []; // IDs de los desarrolladores seleccionados

  constructor(
    private dialogRef: MatDialogRef<AddDevelopersDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { currentDevelopers: any[] }
  ) {}

  ngOnInit(): void {
  this.apiService.getDevelopers().subscribe(
    (developers) => {
      // Filtrar desarrolladores para excluir los que ya están asociados y los que tienen valores nulos
      this.developers = developers.filter(
        (dev) => 
          dev.nombre && dev.correo && // Excluir si `nombre` o `correo` son null
          !this.data.currentDevelopers.some((currentDev) => currentDev.id === dev.id)
      );
      this.filteredDevelopers = [...this.developers]; // Inicializar la lista filtrada
    },
    (error) => {
      console.error('Error al cargar desarrolladores:', error);
    }
  );
}

  filterDevelopers(event: Event): void {
  const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.filteredDevelopers = this.developers.filter((dev) =>
    dev.nombre?.toLowerCase().includes(query)
  );
}

  onSave(): void {
    this.dialogRef.close(this.selectedDevelopers); // Enviar IDs seleccionados al componente padre
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
