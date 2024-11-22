import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegistrarDesarrolladorDialogComponent } from '../registrar-desarrollador-dialog/registrar-desarrollador-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EditarDesarrolladorComponent } from '../editar-desarrollador/editar-desarrollador.component';
import { ApiService } from '../../api.service';
import { Developers } from '../../models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-desarrolladores',
  styleUrls: ['./listado-desarrolladores.component.scss'],
  templateUrl: './listado-desarrolladores.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    RegistrarDesarrolladorDialogComponent,
    MatTooltipModule,
    MatButtonModule,
    EditarDesarrolladorComponent,
    CommonModule
  ],
})
export class ListadoDesarrolladoresComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombre', 'email', 'rol', 'fechaContratacion', 'acciones'];
  dataSource = new MatTableDataSource<Developers>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDevelopers();
  }

  getDevelopers(): void {
    this.apiService.getDevelopers().subscribe(
      (data: Developers[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching developers:', error);
      }
    );
  }

  deleteElement(element: Developers): void {
    // Lógica para eliminar un desarrollador, puedes llamar a un endpoint del API para eliminarlo
    const data = this.dataSource.data;
    this.dataSource.data = data.filter(item => item !== element);
  }

  openRegistrarDialog(): void {
    const dialogRef = this.dialog.open(RegistrarDesarrolladorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Agregar el nuevo desarrollador al dataSource
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(element: Developers): void {
    const dialogRef = this.dialog.open(EditarDesarrolladorComponent, {
      width: '600px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar el desarrollador editado en el dataSource
        const index = this.dataSource.data.findIndex(item => item.id === element.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource(this.dataSource.data); // Refrescar la tabla
        }
      }
    });
  }
}
