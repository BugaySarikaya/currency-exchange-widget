import { NgModule } from '@angular/core';
import { Constants } from '../config/constants';
import { ApiEndpointsService } from './services/api-endpoints.service';
import { ApiHttpService } from './services/api-http.service';
@NgModule({
  declarations: [],
  exports: [],
  entryComponents: [],
  imports: [],
  providers: [
    ApiHttpService,
    ApiEndpointsService,
    Constants,
  ],
})
export class CoreModule { }
