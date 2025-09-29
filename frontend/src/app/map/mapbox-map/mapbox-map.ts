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

interface ILocation {
  id: number;
  latitude: number;
  longitude: number;
  [key: string]: any; // Permite propiedades adicionales
}

@Component({
  selector: 'app-mapbox-map',
  imports: [],
  templateUrl: './mapbox-map.html',
  styleUrl: './mapbox-map.css',
})
export class MapboxMap implements OnInit, OnDestroy {
  locations = input<ILocation[]>();
  private markers: Marker[] = [];

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: mapboxgl.Map | undefined;
  private mapboxglInstance: typeof mapboxgl | undefined;
  private platformId = inject(PLATFORM_ID);
  mapIsReady = signal(false);
  mapClick = output<{ latitude: number; longitude: number }>();
  editMeeting = output<number>();

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // SSR check to ensure this runs in the browser as GL JS requires a browser environment
      this.mapboxglInstance = (await import('mapbox-gl')).default; // dynamically import mapbox-gl as the default export

      this.map = new this.mapboxglInstance.Map({
        accessToken:
          'pk.eyJ1Ijoic295anVhbmRlbGdhZG8iLCJhIjoiY21mbWZ6ZmFzMDF0djJqcXp5MmF6bnkxeiJ9.4MxEetjDrbZZsM2zPp0gDw',
        container: this.mapContainer.nativeElement, // Reference to the map container element
        // center: [2.17795188, 41.38825991], //Barcelona
        // zoom: 12, // Initial zoom level
      });

      this.map.on('click', (e) => {
        const clickedOnMarker = (e.originalEvent.target as HTMLElement)?.closest(
          '.mapboxgl-marker'
        );
        if (!clickedOnMarker) {
          const { lng, lat } = e.lngLat;
          this.mapClick.emit({ latitude: lat, longitude: lng });
        }
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
            const popupContent = this.createPopupContent(location);
            const popup = new this.mapboxglInstance!.Popup({ offset: 25 }).setDOMContent(popupContent);

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

  // //Añadir meetingId 
  // private createPopupContent(location: any): string {
  //   return `<h3>${location.name}</h3>
  //           <h4>${location.date}</h4>
  //           <p>Teléfono: ${location.phone}</p>
  //           <button>Edit</button>`;
  // }

  private createPopupContent(location: ILocation): HTMLElement {
    const container = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = location['name'] || 'Sin nombre'; // Utiliza el índice para acceder a la propiedad
    const date = document.createElement('h4');
    date.textContent = location['date'] || 'Sin fecha';
    const phone = document.createElement('p');
    phone.textContent = `Teléfono: ${location['phone'] || 'N/A'}`;
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.editMeeting.emit(location.id);
    });

    container.appendChild(name);
    container.appendChild(date);
    container.appendChild(phone);
    container.appendChild(button);

    return container;
  }
}
