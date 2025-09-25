import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMeeting } from '../models/imeeting';
import { IMeetingDto } from '../models/imeeting-dto';

@Injectable({
  providedIn: 'root',
})
export class MeetingsApiService {
  private http = inject(HttpClient);

  private toMeetingDto(meeting: IMeeting): IMeetingDto {
    const date = meeting.date;

    // Obtener año, mes y día de la fecha
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 y aseguramos dos dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Aseguramos dos dígitos

    // Construir el string de fecha en el formato 'yyyy-MM-dd'
    const formattedDate = `${year}-${month}-${day}`;

    console.log('Fecha str: ' + formattedDate);
    return {
      name: meeting.name,
      phone: meeting.phone,
      date: formattedDate,
      longitude: meeting.longitude,
      latitude: meeting.latitude,
    };
  }

  getMeetings$() {
    return this.http.get<IMeeting[]>(environment.MEETINGS_API_URL);
  }

  getMeeting$(id: number) {
    return this.http.get<IMeeting>(environment.MEETINGS_API_URL + id);
  }

  addMeeting$(meeting: IMeeting) {
    const dto: IMeetingDto = this.toMeetingDto(meeting);
    return this.http.post<IMeeting>(environment.MEETINGS_API_URL, dto);
  }

  updateMeeting$(id:number, meeting: IMeeting) {
    const dto: IMeetingDto = this.toMeetingDto(meeting);
    return this.http.put<IMeeting>(environment.MEETINGS_API_URL + id, dto);
  }
  
  deleteMeeting$(id: number) {
    return this.http.delete<IMeeting>(environment.MEETINGS_API_URL + id);
  }
}
