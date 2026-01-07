import { Component, computed, inject, signal } from '@angular/core';
import { SnelgidsService } from '../snelgids.service';
import { DialogLocationsComponent } from "./dialog-locations/dialog-locations.component";

@Component({
    selector: 'app-filter-locations',
    imports: [DialogLocationsComponent],
    templateUrl: './filter-locations.component.html',
    styleUrl: './filter-locations.component.css'
})
export class FilterLocationsComponent {

  private readonly snelgidsService = inject(SnelgidsService);

  protected locations = computed(() => this.snelgidsService.getLocations());
  protected selectedLocations = computed(() => this.snelgidsService.selectedLocations());

  protected amountLocationsNotSelected(): number {
    return this.locations().length - this.selectedLocations().length;
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
    this.dialogLocationsIsOpen.set(false);
  }

}
