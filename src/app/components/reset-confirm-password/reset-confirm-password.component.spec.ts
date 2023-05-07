import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetConfirmPasswordComponent } from './reset-confirm-password.component';

describe('ResetConfirmPasswordComponent', () => {
  let component: ResetConfirmPasswordComponent;
  let fixture: ComponentFixture<ResetConfirmPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetConfirmPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetConfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
