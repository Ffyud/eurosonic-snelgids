import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapBarNavComponent } from "./tap-bar-nav/tap-bar-nav.component";
import { DialogQrCodeComponent } from "./dialog-qr-code/dialog-qr-code.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TapBarNavComponent, DialogQrCodeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eurosonic-snelgids';

  protected shareData = {
    title: "Eurosonic Snelgids",
    text: "De Eurosonic Snelgids van de Lijstjesman",
    url: "https://ffyud.github.io/eurosonic-snelgids",
  };

  protected dialogQrCodeIsOpen: WritableSignal<boolean> = signal(false);

  protected webShareIsAvailable(): boolean {
    try {
      navigator.share()
    } catch (error) {
      if(error instanceof TypeError) return false;
    } 
    return true;
  }

  protected onShare() {
    navigator.share(this.shareData)
  }

  protected openDialogQrCode() {
    this.dialogQrCodeIsOpen() ? this.dialogQrCodeIsOpen.set(false) : this.dialogQrCodeIsOpen.set(true);
  }

  protected closeDialogQrCode() {
    this.dialogQrCodeIsOpen.set(false);
  }

}
