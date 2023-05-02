import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFindComponent } from './input-find.component';

describe('InputFindComponent', () => {
  let component: InputFindComponent;
  let fixture: ComponentFixture<InputFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
