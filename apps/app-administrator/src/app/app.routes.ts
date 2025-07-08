import { Route } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // base url redirects to `login`
  // Components here:
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  // { path: '**', component: PageNotFoundComponent }, // redirect to 404 handler page
  // { path: '**', redirectTo: '/page-not-found' },
];
