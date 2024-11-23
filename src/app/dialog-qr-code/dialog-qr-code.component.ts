import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog-qr-code',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dialog-qr-code.component.html',
  styleUrl: './dialog-qr-code.component.css'
})
export class DialogQrCodeComponent {

  isOpen = input.required<boolean>();
  close = output<boolean>();

  clickClose() {
    this.close.emit(true);
  }
}
