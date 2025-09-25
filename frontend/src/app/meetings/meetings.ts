import { Component, inject, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DialogForm } from '../shared/components/dialog-form/dialog-form';
import { MeetingsService } from '../shared/services/meetings-service';
import { IMeeting } from '../shared/models/imeeting';

@Component({
  selector: 'app-meetings',
  imports: [TableModule, Button, DialogForm],
  templateUrl: './meetings.html',
  styleUrl: './meetings.css',
})
export class Meetings {
  @ViewChild('dialogForm') dialogForm!: DialogForm;
  delete = false;
  service = inject(MeetingsService);
  meetings = this.service.meetings;

  showForm() {
    const meeting: IMeeting = {
      id:0,
      name: '',
      phone: '',
      date: new Date(),
      longitude: 0,
      latitude: 0,      
    }
    this.dialogForm.showDialog(meeting);
  }

  saveMeeting(meeting: IMeeting) {
    console.log(meeting)
    if (meeting.id !== 0) {
      this.service.updateMeeting(meeting.id, meeting);
    } else {
      this.service.addMeeting(meeting);
    }
  }

  getMeeting(id: number) {
    this.service.getMeeting(id);
    console.log(this.service.meeting);
  }

  addMeeting() {
    const meeting: IMeeting = {
      id: 0,
      name: 'Prueba',
      phone: '123456789',
      date: new Date('1900-01-01'),
      longitude: 2.684346453,
      latitude: 40.3548648153,
    };

    this.service.addMeeting(meeting);
  }

  updateMeeting(id: number) {
    const meeting: IMeeting = {
      id: id,
      name: 'Modificado',
      phone: '123456789',
      date: new Date('2000-01-01'),
      longitude: 2.684346453,
      latitude: 40.3548648153,
    };
    this.service.updateMeeting(id, meeting);
  }

  deleteMeeting(id: number) {
      this.service.deleteMeeting(id);
  }
}
