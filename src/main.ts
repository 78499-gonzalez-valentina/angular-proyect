import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(), // Provee HttpClient con la nueva forma recomendada
    ...(appConfig.providers || []),
  ],
}).catch((err) => console.error(err));