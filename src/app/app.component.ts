import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapBarNavComponent } from "./tap-bar-nav/tap-bar-nav.component";
import { DialogQrCodeComponent } from "./dialog-qr-code/dialog-qr-code.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TapBarNavComponent, DialogQrCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eurosonic-snelgids';

  protected dialogQrCodeIsOpen: WritableSignal<boolean> = signal(false);

  protected openDialogQrCode() {
    this.dialogQrCodeIsOpen() ? this.dialogQrCodeIsOpen.set(false) : this.dialogQrCodeIsOpen.set(true);
  }

  protected closeDialogQrCode() {
    this.dialogQrCodeIsOpen.set(false);
  }

}
