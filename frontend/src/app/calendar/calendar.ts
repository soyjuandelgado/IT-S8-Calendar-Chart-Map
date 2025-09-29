import { Component, computed, inject, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MeetingsService } from '../shared/services/meetings-service';
import { IMeeting } from '../shared/models/imeeting';
import { DialogForm } from '../shared/components/dialog-form/dialog-form';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, DialogForm],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  @ViewChild('dialogForm') dialogForm!: DialogForm;
  service = inject(MeetingsService);
  meetings = this.service.meetings;

  calendarEvents = computed(() => {
    return this.meetings().map((meeting) => ({
      // id: meeting.id,
      title: meeting.name,
      date: meeting.date,
      phone: meeting.phone,
      latitude: meeting.latitude,
      longitude: meeting.longitude,
      meetingId: meeting.id,
    }));
  });

  handleDateClick = (arg: any) => {
    this.addMeeting(arg.date);
  };

  handleEventClick = (arg: any) => {
    const meetingId = arg.event.extendedProps.meetingId;
    this.updateMeeting(meetingId)
  };

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true, // mostrar fines de semana
    editable: true,
    selectable: true,
    dateClick: this.handleDateClick,
    eventClick: this.handleEventClick,
  };

  addMeeting(date: Date) {
    const meeting: IMeeting = {
      id: 0,
      name: '',
      phone: '',
      date: date,
      longitude: 0,
      latitude: 0,
    };
    this.dialogForm.showDialog(meeting);
  }

  saveMeeting(meeting: IMeeting) {
    console.log(meeting);
    if (meeting.id !== 0) {
      this.service.updateMeeting(meeting.id, meeting);
    } else {
      this.service.addMeeting(meeting);
    }
  }

  updateMeeting(id: number) {
    const meeting = this.meetings().find((m) => m.id === id);
    if (meeting) this.dialogForm.showDialog(meeting);
    else console.error('Reunión no encontrada');
  }

  deleteMeeting(id: number) {
    this.service.deleteMeeting(id);
  }
}
