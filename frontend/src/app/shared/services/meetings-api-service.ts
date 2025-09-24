import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMeeting } from '../models/imeeting';

@Injectable({
  providedIn: 'root',
})
export class MeetingsApiService {
  private http = inject(HttpClient);

  getMeetings$() {
    return this.http.get<IMeeting[]>(environment.MEETINGS_API_URL);
  }
}
