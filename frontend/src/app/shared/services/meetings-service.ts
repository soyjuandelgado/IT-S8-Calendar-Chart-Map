import { inject, Injectable, signal } from '@angular/core';
import { MeetingsApiService } from './meetings-api-service';
import { IMeeting } from '../models/imeeting';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private api = inject(MeetingsApiService);
  private _meetings = signal<IMeeting[]>([]);
  private _meeting = signal<IMeeting | undefined>(undefined);

  public readonly meetings = this._meetings.asReadonly();
  public readonly meeting = this._meeting.asReadonly();

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

  getMeeting(id: number): void {
    this.api.getMeeting$(id).subscribe({
      next: (response) => {
        this._meeting.set(response);
      },
      error: (err) => {
        console.error('Error al obtener reunion', err);
      },
    });
  }

  addMeeting(meeting: IMeeting): void {
    this.api
      .addMeeting$(meeting)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this._meetings.update((currentMeetings) => [...currentMeetings, response]);
          },
          error: (err) => {
            console.error('Error al añadir reunión', err);
          },
        })
      )
      .subscribe();
  }

  updateMeeting(id: number, meeting: IMeeting): void {
    this.api
      .updateMeeting$(id, meeting)
      .pipe(
        tap({
          next: (response) => {
            this._meetings.update((currentMeetings) =>
              currentMeetings.map((m) => (m.id === id ? response : m))
            );
          },
          error: (err) => {
            console.error('Error al actualizar la reunión', err);
          },
        })
      )
      .subscribe();
  }

  deleteMeeting(id: number): void {
    this.api
      .deleteMeeting$(id)
      .pipe(
        tap({
          next: () => {
            // Usa el método 'update' para filtrar y eliminar la reunión
            this._meetings.update((currentMeetings) => currentMeetings.filter((m) => m.id !== id));
          },
          error: (err) => {
            console.error('Error al eliminar la reunión', err);
          },
        })
      )
      .subscribe();
  }
}
