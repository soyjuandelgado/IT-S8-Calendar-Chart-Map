import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-dialog-form',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    InputNumberModule,
    KeyFilterModule,
  ],
  templateUrl: './dialog-form.html',
  styleUrl: './dialog-form.css',
})
export class DialogForm {
  visible = false;

  public showDialog() {
    this.visible = true;
  }
}
