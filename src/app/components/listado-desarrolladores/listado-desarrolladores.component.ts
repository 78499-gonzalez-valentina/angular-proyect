import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegistrarDesarrolladorDialogComponent } from '../registrar-desarrollador-dialog/registrar-desarrollador-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EditarDesarrolladorComponent } from '../editar-desarrollador/editar-desarrollador.component';

export interface Developers {
  nombre: string;
  email: string;
  rol: string;
  fechaContratacion: string;
}

const ELEMENT_DATA: Developers[] = [
  { nombre: 'Josefina',email:"joseb31@gmail.com", rol:"Desarrollador", fechaContratacion:'24/03/2018'},
  { nombre: 'Valentina',email:"val7@gmail.com", rol:"Desarrollador", fechaContratacion:'27/01/2024'},
  { nombre: 'Felipe',email:"feli21@gmail.com", rol:"Desarrollador", fechaContratacion:'24/06/2022'},
  { nombre: 'Matías',email:"matias1@gmail.com", rol:"Desarrollador", fechaContratacion:'14/07/2023'},
  { nombre: 'Santiago',email:"santi@gmail.com", rol:"Desarrollador", fechaContratacion:'02/05/2023'},
  { nombre: 'María', email:"maria1@gmail.com", rol:"Desarrollador", fechaContratacion:'24/03/2018'},
  { nombre: 'Santiago',email:"santi@gmail.com", rol:"Desarrollador", fechaContratacion:'02/05/2023'},
  { nombre: 'Santiago',email:"santi@gmail.com", rol:"Desarrollador", fechaContratacion:'02/05/2023'}
  
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-listado-desarrolladores',
  styleUrl: './listado-desarrolladores.component.scss',
  templateUrl: './listado-desarrolladores.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, RegistrarDesarrolladorDialogComponent, MatTooltipModule, MatButtonModule, EditarDesarrolladorComponent],
})
export class ListadoDesarrolladoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'email', 'rol', 'fechaContratacion', 'acciones'];
  dataSource = new MatTableDataSource<Developers>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {}

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(EditarDesarrolladorComponent, {
      width: '600px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar el elemento en el dataSource con los datos editados
        const index = this.dataSource.data.findIndex(item => item === element);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource(this.dataSource.data); // Refrescar la tabla
        }
      }
    });
  }
}
