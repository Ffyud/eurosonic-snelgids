import { Component, inject, signal } from '@angular/core';
import { Location } from '../location.enum';
import { SnelgidsService } from '../snelgids.service';
import { DialogLocationsComponent } from "./dialog-locations/dialog-locations.component";

@Component({
  selector: 'app-filter-locations',
  standalone: true,
  imports: [DialogLocationsComponent],
  templateUrl: './filter-locations.component.html',
  styleUrl: './filter-locations.component.css'
})
export class FilterLocationsComponent {

  dialogLocationsIsOpen = signal<boolean>(false);

  openDialogLocations() {
    if(this.dialogLocationsIsOpen()) {
      this.dialogLocationsIsOpen.set(false);
    } else {
      this.dialogLocationsIsOpen.set(true);
    }
  }

  protected closeDialogLocations() {
    this.dialogLocationsIsOpen.set(false);
  }

}
