import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ListadoDesarrolladoresComponent } from "../listado-desarrolladores/listado-desarrolladores.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ListadoDesarrolladoresComponent, RouterLink, RouterOutlet, MatSidenavModule,  MatButtonModule, MatListModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
 public sideBarOpen: boolean = false;

  constructor() {}

  sideBarToggler(event: any) {
    if (event) {
      this.sideBarOpen = !this.sideBarOpen;
    } else {
      this.sideBarOpen = event;
    }
  }
}
