import { Component, inject, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DialogForm } from '../shared/components/dialog-form/dialog-form';
import { MeetingsService } from '../shared/services/meetings-service';
@Component({
  selector: 'app-meetings',
  imports: [TableModule, Button, DialogForm],
  templateUrl: './meetings.html',
  styleUrl: './meetings.css',
})
export class Meetings {
  @ViewChild('dialogForm') dialogForm!: DialogForm;
  service = inject(MeetingsService);
  meetings = this.service.meetings;


  showForm() {
    this.dialogForm.showDialog();
  }

  // meetings = [
  //   {
  //       id: 1,
  //       name: "Reunión de Bienvenida",
  //       phone: "987654321",
  //       date: "2025-09-23",
  //       longitude: 2.17795188,
  //       latitude: 41.38825990
  //   },
  //   {
  //       id: 2,
  //       name: "Reunión de Reencuentro",
  //       phone: "666666666",
  //       date: "2025-09-22",
  //       longitude: 2.16967842,
  //       latitude: 41.43671281
  //   }
  // ]
}
