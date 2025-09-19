import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Calendar } from './calendar/calendar';
import { Chart } from './chart/chart';
import { Map } from './map/map';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'calendar',
    component: Calendar,
  },
  {
    path: 'chart',
    component: Chart,
  },
  {
    path: 'map',
    component: Map,
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  },
];
