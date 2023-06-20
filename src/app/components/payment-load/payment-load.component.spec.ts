import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoadComponent } from './payment-load.component';

describe('PaymentLoadComponent', () => {
  let component: PaymentLoadComponent;
  let fixture: ComponentFixture<PaymentLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
