import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFavoritesComponent } from './page-favorites.component';

describe('PageFavoritesComponent', () => {
  let component: PageFavoritesComponent;
  let fixture: ComponentFixture<PageFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
