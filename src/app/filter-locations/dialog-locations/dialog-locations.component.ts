import { Component, computed, inject, input, output } from '@angular/core';
import { SnelgidsService } from '../../snelgids.service';
import { Location } from '../../location.enum';

@Component({
    selector: 'app-dialog-locations',
    imports: [NgClass],
    templateUrl: './dialog-locations.component.html',
    styleUrl: './dialog-locations.component.css'
})
export class DialogLocationsComponent {
  private readonly snelgidsService = inject(SnelgidsService);

  isOpen = input.required<boolean>();
  isClosed = output<boolean>();

  protected locations: Location[] = this.snelgidsService.getLocations();
  protected readonly selectedLocations = computed(() => {
    if (this.snelgidsService.selectedLocations().length !== 0) {
      return this.snelgidsService.selectedLocations();
    }
    return this.snelgidsService.getLocations();
  });

  onClick(location: Location): void {
    this.snelgidsService.setSelectedLocations(location);
  }

  locationIsSelected(location: Location): boolean {
    return this.selectedLocations().includes(location)
  }

  clickClose() {
    this.isClosed.emit(true);
  }
}
