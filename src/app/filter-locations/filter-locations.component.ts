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

  snelgidsService = inject(SnelgidsService);

  protected locations: Location[] = this.snelgidsService.getLocations();
  protected selectedLocations = signal<Location[]>(this.snelgidsService.getSelectedLocations());

  protected amountDeselectedLocations(): number {
    console.log(this.selectedLocations());
    return this.locations.length - this.selectedLocations().length;
  }

  dialogLocationsIsOpen = signal<boolean>(false);

  openDialogLocations() {
    if(this.dialogLocationsIsOpen()) {
      this.dialogLocationsIsOpen.set(false);
    } else {
      this.dialogLocationsIsOpen.set(true);
    }
  }

  protected closeDialogLocations() {
    this.selectedLocations.set(this.snelgidsService.getSelectedLocations());  // Anders geen update op amountDeselectedLocations
    this.dialogLocationsIsOpen.set(false);
  }

}
