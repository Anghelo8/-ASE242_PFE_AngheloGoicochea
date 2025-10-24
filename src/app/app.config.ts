// src/main.ts o app.config.ts
import { HttpClientModule } from '@angular/common/http';

// En standalone:
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    // ...
  ]
});