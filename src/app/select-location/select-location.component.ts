import { Component, inject, signal } from '@angular/core';
import { Location } from '../location.enum';
import { SnelgidsService } from '../snelgids.service';

@Component({
  selector: 'app-select-location',
  standalone: true,
  imports: [],
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.css'
})
export class SelectLocationComponent {

  snelgidsService = inject(SnelgidsService);
  
  protected locations: Location[] = this.snelgidsService.getLocations();
  protected selectedLocations = signal<Location[]>(this.snelgidsService.getSelectedLocations());

  showMenu = signal<boolean>(false);
  onClick(location: Location): void {
    this.snelgidsService.setSelectedLocations(location);
    // Update signal zodat locationIsSelected het opmerkt
    this.selectedLocations.set(this.snelgidsService.getSelectedLocations()); 
  }

  locationIsSelected(location: Location): boolean {
    return this.selectedLocations().includes(location)
  }

  onToggleMenu() {
    if(this.showMenu()) {
      this.showMenu.set(false);
    } else {
      this.showMenu.set(true);
    }
  }
}
