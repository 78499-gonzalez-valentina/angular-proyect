import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MatChipsModule, MatCardModule],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss'
})
export class ProyectoComponent {

}
