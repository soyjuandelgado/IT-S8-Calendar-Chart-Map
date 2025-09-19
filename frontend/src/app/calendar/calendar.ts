import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true, // mostrar fines de semana
    events: [
      { title: 'Evento 1', date: '2025-09-17' },
      { title: 'Evento 2', date: '2025-09-18' },
    ],
  };
}
