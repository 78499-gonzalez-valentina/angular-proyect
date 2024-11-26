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

   getProyectoById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/proyectos/${id}`);
}

getTareasByDesarrolladorId(id: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/tareas/desarrollador/${id}`);
}
getDesarrolladoresByProyecto(idProyecto: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/proyectos/${idProyecto}/desarrolladores`);
}

// Obtener tareas asociadas a un proyecto
getTareasByProyecto(idProyecto: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/tareas/proyecto/${idProyecto}`);
}

getRoles(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/roles`);
}

updateDeveloper(id: number, updatedData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/desarrolladores/${id}`, updatedData);
}

deleteDeveloper(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/desarrolladores/${id}`);
}

createDeveloper(developerData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/desarrolladores`, developerData);
}

createProject(projectData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/proyectos`, projectData);
}

createTarea(tarea: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/tareas`, tarea);
}

updateProyecto(id: number, proyectoData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/proyectos/${id}`, proyectoData);
}
}

