import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MapboxMap } from './mapbox-map/mapbox-map';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MapboxMap],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
