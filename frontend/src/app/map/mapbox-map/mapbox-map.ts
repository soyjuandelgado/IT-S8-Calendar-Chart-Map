import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapbox-map',
  imports: [],
  templateUrl: './mapbox-map.html',
  styleUrl: './mapbox-map.css'
})
export class MapboxMap  implements OnInit, OnDestroy{
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: any;
  private platformId = inject(PLATFORM_ID);
  
  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { // SSR check to ensure this runs in the browser as GL JS requires a browser environment
      const mapboxgl = (await import('mapbox-gl')).default // dynamically import mapbox-gl as the default export

      // Create a new map instance
      this.map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1Ijoic295anVhbmRlbGdhZG8iLCJhIjoiY21mbWZ6ZmFzMDF0djJqcXp5MmF6bnkxeiJ9.4MxEetjDrbZZsM2zPp0gDw',
        container: this.mapContainer.nativeElement, // Reference to the map container element
        center: [2.1779518808122282, 41.38825990604182], //Barcelona
        zoom: 12, // Initial zoom level
      });
    }
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

}
