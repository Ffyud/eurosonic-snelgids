import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapBarNavComponent } from './tap-bar-nav.component';

describe('TapBarNavComponent', () => {
  let component: TapBarNavComponent;
  let fixture: ComponentFixture<TapBarNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TapBarNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TapBarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
