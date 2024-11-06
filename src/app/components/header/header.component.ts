import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems = [{name:'Inicio', route:'/', icon:'home'},
    {name:'Desarrolladores', route:'desarrolladores', icon:'person'},
      {name:'Proyectos', route:'proyectos', icon:'library_books'},
      {name:'Tareas', route:'tareas', icon:'task'}]
  menu: boolean = false;

  abrirMenu(){
    this.menu = !this.menu;
  }

}
