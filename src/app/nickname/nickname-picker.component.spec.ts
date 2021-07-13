import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicknamePickerComponent } from './nickname-picker.component';

describe('NicknameComponent', () => {
  let component: NicknamePickerComponent;
  let fixture: ComponentFixture<NicknamePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NicknamePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NicknamePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
