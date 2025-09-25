import { Component, inject } from '@angular/core';
import { MapboxMap } from './mapbox-map/mapbox-map';
import { MeetingsService } from '../shared/services/meetings-service';

@Component({
  selector: 'app-map',
  imports: [MapboxMap],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  service = inject(MeetingsService);
  meetings = this.service.meetings;
}
