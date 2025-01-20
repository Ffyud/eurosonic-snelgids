import { Component, inject, signal } from '@angular/core';
import { SnelgidsService } from '../snelgids.service';
import { Location } from '../location.enum';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-tap-bar-nav',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './tap-bar-nav.component.html',
    styleUrl: './tap-bar-nav.component.css'
})
export class TapBarNavComponent {
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
