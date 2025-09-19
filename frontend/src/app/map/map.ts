import { Component } from '@angular/core';
import { MapboxMap } from './mapbox-map/mapbox-map';

@Component({
  selector: 'app-map',
  imports: [MapboxMap],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

}
