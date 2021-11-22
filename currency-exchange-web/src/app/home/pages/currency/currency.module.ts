import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/shared/app-shared.module';
import { CurrencyComponent } from './currency.component';
import { CurrencyRouters } from './currency.routing';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    CurrencyComponent
  ],
  imports: [
    RouterModule.forChild(CurrencyRouters),
    AppSharedModule,
    ProgressBarModule
  ],
})
export class CurrencyModule { }
