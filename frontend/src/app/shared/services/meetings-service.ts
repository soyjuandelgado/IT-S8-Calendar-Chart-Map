import { inject, Injectable, signal } from '@angular/core';
import { MeetingsApiService } from './meetings-api-service';
import { IMeeting } from '../models/imeeting';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private api = inject(MeetingsApiService);
  private _meetings = signal<IMeeting[]>([]);

  public readonly meetings = this._meetings.asReadonly();

  constructor() {
    this.getMeetings();
  }

  getMeetings(): void {
    this.api.getMeetings$().subscribe({
      next: (response) => {
        this._meetings.set(response);
      },
      error: (err) => {
        console.error('Error al obtener reuniones', err);
      },
    });
  }
}
