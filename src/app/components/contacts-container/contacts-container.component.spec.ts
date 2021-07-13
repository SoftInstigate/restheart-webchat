import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsContainerComponent } from './contacts-container.component';

describe('ContactsContainerComponent', () => {
  let component: ContactsContainerComponent;
  let fixture: ComponentFixture<ContactsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
