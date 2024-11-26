import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegistrarDesarrolladorDialogComponent } from '../registrar-desarrollador-dialog/registrar-desarrollador-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EditarDesarrolladorComponent } from '..//editar-desarrollador/editar-desarrollador.component';
import { ApiService } from '../../api.service';
import { Developers } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { ModalDeveloperInfoComponent } from '../modal-developer-info/modal-developer-info.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ErrorDialogComponent } from '../error-dialog-component/error-dialog-component.component';

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
    MatTooltipModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class ListadoDesarrolladoresComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombre', 'email', 'rol', 'fechaContratacion', 'acciones'];
  dataSource = new MatTableDataSource<Developers>([]);
   roles: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDevelopers();
  }

getDevelopers(): void {
  this.apiService.getDevelopers().subscribe(
    (data: Developers[]) => {
      // Filtrar los desarrolladores cuyos campos obligatorios no son null
      this.dataSource.data = data.filter((developer: Developers) => {
        return (
          developer.nombre !== null &&
          developer.correo !== null &&
          developer.rol !== null && // Excluir si `rol` es null
          developer.fechaContratacion !== null
        );
      });
    },
    (error) => {
      console.error('Error fetching developers:', error);
    }
  );
}


openRegistrarDialog(): void {
  const dialogRef = this.dialog.open(RegistrarDesarrolladorDialogComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log('Datos enviados al backend:', result); // Depuración
      this.apiService.createDeveloper(result).subscribe(
        (response) => {
          console.log('Desarrollador registrado:', response);
          this.dataSource.data = [...this.dataSource.data, response];
          this.dataSource._updateChangeSubscription();
        },
        (error) => {
          console.error('Error al registrar el desarrollador:', error); // Aquí veremos el error completo
        }
      );
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

 openEditDialog(developer: Developers): void {
  const dialogRef = this.dialog.open(EditarDesarrolladorComponent, {
    data: developer, // Pasar los datos del desarrollador al modal
    width: '500px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.updateDeveloper(developer.id, result); // Llama al método para actualizar los datos en el backend
    }
  });
}

updateDeveloper(id: number, updatedData: any): void {
  this.apiService.updateDeveloper(id, updatedData).subscribe(
    (response) => {
      console.log('Desarrollador actualizado:', response);
      // Actualizar los datos en la tabla
      const index = this.dataSource.data.findIndex((dev) => dev.id === id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.dataSource.data[index], ...updatedData };
        this.dataSource._updateChangeSubscription(); // Refrescar la tabla
      }
    },
    (error) => {
      console.error('Error al actualizar el desarrollador:', error);
    }
  );
}

   openDeveloperInfo(developer: Developers): void {
    this.dialog.open(ModalDeveloperInfoComponent, {
      data: developer,
      width: '500px',
    });
  }
deleteElement(developer: any): void {
  const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    width: '400px',
    data: { nombre: developer.nombre },
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.apiService.deleteDeveloper(developer.id).subscribe(
        (response) => {
          console.log('Desarrollador eliminado:', response);

          // Eliminar el desarrollador de la tabla del frontend
          this.dataSource.data = this.dataSource.data.filter((item) => item.id !== developer.id);
          this.dataSource._updateChangeSubscription(); // Refresca la tabla
        },
        (error) => {
          // Manejo del error 500 con un diálogo
          if (error.status === 500) {
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              data: {
                message:
                  'No se pudo eliminar el desarrollador porque está establecido como responsable de un proyecto.',
              },
            });
          } else if (error.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              data: {
                message: error.error.message || 'No se pudo eliminar el desarrollador.',
              },
            });
          } else {
            console.error('Error inesperado al eliminar el desarrollador:', error);
          }
        }
      );
    }
  });
}
}
