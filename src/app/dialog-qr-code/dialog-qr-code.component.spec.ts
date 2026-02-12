import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQrCodeComponent } from './dialog-qr-code.component';

describe('DialogQrCodeComponent', () => {
  let component: DialogQrCodeComponent;
  let fixture: ComponentFixture<DialogQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogQrCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQrCodeComponent);
    component = fixture.componentInstance;
    // Provide required input for Angular 21
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
