import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { IMeeting } from '../../models/imeeting';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    InputNumberModule,
    KeyFilterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-form.html',
  styleUrl: './dialog-form.css',
})
export class DialogForm {
  visible = false;

  @Output() public save = new EventEmitter<IMeeting>();

  private formBuilder = inject(FormBuilder);

  public meetingForm: FormGroup = this.formBuilder.group({
    id: new FormControl(0),
    name: new FormControl(''),
    phone: new FormControl(''),
    date: new FormControl<Date | undefined>(undefined),
    longitude: new FormControl(0),
    latitude: new FormControl(0),
  });

  public showDialog(meeting: IMeeting) {
    this.meetingForm.patchValue(meeting);
    this.visible = true;
  }

  onSave() {
    // console.log(this.meetingForm.value);
    this.save.emit(this.meetingForm.value as IMeeting);
    this.visible = false;
  }
}
