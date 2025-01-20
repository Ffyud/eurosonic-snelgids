import { Component, inject, input, output, signal } from '@angular/core';
import { SnelgidsService } from '../../snelgids.service';
import { Location } from '../../location.enum';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-dialog-locations',
    imports: [NgClass],
    templateUrl: './dialog-locations.component.html',
    styleUrl: './dialog-locations.component.css'
})
export class DialogLocationsComponent {
  snelgidsService = inject(SnelgidsService);

  isOpen = input.required<boolean>();
  close = output<boolean>();

  protected locations: Location[] = this.snelgidsService.getLocations();
  protected selectedLocations = signal<Location[]>(this.snelgidsService.getSelectedLocations());

  onClick(location: Location): void {
    this.snelgidsService.setSelectedLocations(location);
    // Update signal zodat locationIsSelected het opmerkt
    this.selectedLocations.set(this.snelgidsService.getSelectedLocations()); 
  }

  locationIsSelected(location: Location): boolean {
    return this.selectedLocations().includes(location)
  }


  clickClose() {
    this.close.emit(true);
  }
}
