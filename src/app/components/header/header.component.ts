import { Component,HostListener } from '@angular/core';
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
      {name:'Tareas', route:'tareas', icon:'task'},
     {name:'Métricas', route:'metricas', icon:'bar_chart'}]
  menu: boolean = false;

  abrirMenu(){
    this.menu = !this.menu;
  }

   @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Si el clic ocurre fuera del menú y el botón, cierra el menú
    if (!target.closest('.menu-container') && !target.closest('.custom-button')) {
      this.menu = false;
    }
  }
}
