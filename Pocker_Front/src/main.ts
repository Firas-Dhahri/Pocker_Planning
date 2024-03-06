<<<<<<< HEAD
=======
/// <reference types="@angular/localize" />

>>>>>>> f63b69fb615c7369c9e19c572f91cbb40c7d464c
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
