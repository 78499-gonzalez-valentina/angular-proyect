import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developers, Task, Project } from '../../src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   private apiUrl = 'http://localhost:9000';  // URL base del backend

  constructor(private http: HttpClient) { }
  getDevelopers(): Observable<Developers[]> {
    return this.http.get<Developers[]>(`${this.apiUrl}/desarrolladores`);
  }

  getTareas(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tareas`);
  }

  getProyectos(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/proyectos`);
  }
}
