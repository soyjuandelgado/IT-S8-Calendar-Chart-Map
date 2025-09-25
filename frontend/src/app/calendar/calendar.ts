import { Component, computed, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MeetingsService } from '../shared/services/meetings-service';
@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  service = inject(MeetingsService);
  meetings = this.service.meetings;

  calendarEvents = computed(() => {
    return this.meetings().map((meeting) => ({
      title: meeting.name,
      date: meeting.date,
    }));
  });

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true, // mostrar fines de semana
    events: this.calendarEvents(),
  };
}
