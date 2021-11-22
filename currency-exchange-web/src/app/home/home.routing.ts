import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppNotfoundComponent } from './pages/not-found/app.notfound.component';
export const homeRoutes: Routes = [
  {
    path: 'currency',
    component: HomeComponent, // Lazy Loading
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/currency/currency.module').then(
            (m) => m.CurrencyModule
          ),
      },
    ],
  },
  { path: 'notfound', component: AppNotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
