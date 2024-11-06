import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrarDesarrolladorDialogComponent } from '../registrar-desarrollador-dialog/registrar-desarrollador-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  nombre: string;
  email: string;
  rol: string;
  fechaContratacion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nombre: 'Josefina',email:"joseb31@gmail.com", rol:"Desarrollador", fechaContratacion:'24/03/2018'},
  { nombre: 'Valentina',email:"val7@gmail.com", rol:"Desarrollador", fechaContratacion:'27/01/2024'},
  { nombre: 'Felipe',email:"feli21@gmail.com", rol:"Desarrollador", fechaContratacion:'24/06/2022'},
  { nombre: 'Matías',email:"matias1@gmail.com", rol:"Desarrollador", fechaContratacion:'14/07/2023'},
  { nombre: 'Santiago',email:"santi@gmail.com", rol:"Desarrollador", fechaContratacion:'02/05/2023'},
  { nombre: 'María', email:"maria1@gmail.com", rol:"Desarrollador", fechaContratacion:'24/03/2018'}
  
];

@Component({
  selector: 'app-listado-desarrolladores',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatTooltipModule, RegistrarDesarrolladorDialogComponent],
  templateUrl: './listado-desarrolladores.component.html',
  styleUrl: './listado-desarrolladores.component.scss'
})
export class ListadoDesarrolladoresComponent {
  constructor(public dialog: MatDialog) {}
  displayedColumns: string[] = ['nombre', 'email', 'rol', 'fechaContratacion', 'acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

   deleteElement(element: any) {
    const data = this.dataSource.data;
    this.dataSource.data = data.filter(item => item !== element);
  }
  openRegistrarDialog(): void {
    const dialogRef = this.dialog.open(RegistrarDesarrolladorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }
}
