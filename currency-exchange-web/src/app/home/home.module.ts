import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routing';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppNotfoundComponent } from './pages/not-found/app.notfound.component';
@NgModule({
  declarations: [
    HomeComponent,
    AppNotfoundComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(homeRoutes),
    AppSharedModule,
  ],
})
export class HomeModule { }
