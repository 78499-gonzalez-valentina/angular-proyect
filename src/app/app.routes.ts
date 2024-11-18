import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ListadoDesarrolladoresComponent } from './components/listado-desarrolladores/listado-desarrolladores.component';
import { ListadoProyectosComponent } from './components/listado-proyectos/listado-proyectos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListadoTareasComponent } from './components/listado-tareas/listado-tareas.component';
import { MetricasComponent } from './components/metricas/metricas.component';

export const routes: Routes = [

  {
    path:'',
    component: LayoutComponent,
    children: [
      {path:'',
        component: HomeComponent,
      },
      {path:'desarrolladores',
        component: ListadoDesarrolladoresComponent,
      },
      {path:'proyectos',
      component: ListadoProyectosComponent,
      },
      {path:'tareas',
      component: ListadoTareasComponent,
      },
      {path:'metricas',
      component: MetricasComponent,
      },


    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
