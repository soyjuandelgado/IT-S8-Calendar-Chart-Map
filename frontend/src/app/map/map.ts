import { Component, inject, ViewChild } from '@angular/core';
import { MapboxMap } from './mapbox-map/mapbox-map';
import { MeetingsService } from '../shared/services/meetings-service';
import { IMeeting } from '../shared/models/imeeting';
import { DialogForm } from '../shared/components/dialog-form/dialog-form';

@Component({
  selector: 'app-map',
  imports: [MapboxMap, DialogForm],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  @ViewChild('dialogForm') dialogForm!: DialogForm;
  service = inject(MeetingsService);
  meetings = this.service.meetings;

  onMapClick(coordinates: { latitude: number; longitude: number }) {
    const meeting: IMeeting = {
      id: 0,
      name: '',
      phone: '',
      date: new Date(),
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    };
    this.dialogForm.showDialog(meeting);
  }  

  saveMeeting(meeting: IMeeting) {
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
