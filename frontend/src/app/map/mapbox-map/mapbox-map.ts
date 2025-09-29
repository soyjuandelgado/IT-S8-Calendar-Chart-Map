import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mapbox-map',
  imports: [],
  templateUrl: './mapbox-map.html',
  styleUrl: './mapbox-map.css',
})
export class MapboxMap implements OnInit, OnDestroy {
  locations = input<any[]>();
  private markers: Marker[] = [];

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: mapboxgl.Map | undefined;
  private mapboxglInstance: typeof mapboxgl | undefined;
  private platformId = inject(PLATFORM_ID);
  mapIsReady = signal(false);
  mapClick = output<{ latitude: number; longitude: number }>();

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // SSR check to ensure this runs in the browser as GL JS requires a browser environment
      this.mapboxglInstance = (await import('mapbox-gl')).default; // dynamically import mapbox-gl as the default export

      // Create a new map instance
      this.map = new this.mapboxglInstance.Map({
        accessToken:
          'pk.eyJ1Ijoic295anVhbmRlbGdhZG8iLCJhIjoiY21mbWZ6ZmFzMDF0djJqcXp5MmF6bnkxeiJ9.4MxEetjDrbZZsM2zPp0gDw',
        container: this.mapContainer.nativeElement, // Reference to the map container element
        // center: [2.17795188, 41.38825991], //Barcelona
        // zoom: 12, // Initial zoom level
      });

      this.map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        this.mapClick.emit({ latitude: lat, longitude: lng });
      });

      this.mapIsReady.set(true);
    }
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  constructor() {
    effect(() => {
      if (this.mapIsReady() && this.mapboxglInstance) {
        this.clearMarkers();
        const locations = this.locations();
        if (locations) {
          locations.forEach((location) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${location.name}</h3><h4>${location.date}</h4><p>Teléfono: ${location.phone}</p>`
            );
            const marker = new this.mapboxglInstance!.Marker()
              .setLngLat([location.longitude, location.latitude])
              .setPopup(popup)
              .addTo(this.map!);
            this.markers.push(marker);
          });
        }
      }
    });
  }

  private clearMarkers() {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }
}
