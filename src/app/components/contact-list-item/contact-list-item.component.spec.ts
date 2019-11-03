import { RouterTestingModule } from '@angular/router/testing';
import { PhoneNumberPipe } from './../../pipes/phone-number.pipe';
import { HighlightPipe } from './../../pipes/highlight.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListItemComponent } from './contact-list-item.component';

describe('ContactListItemComponent', () => {
  let component: ContactListItemComponent;
  let fixture: ComponentFixture<ContactListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListItemComponent, HighlightPipe, PhoneNumberPipe ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const router = TestBed.get(Router);
    const route = TestBed.get(ActivatedRoute);

    fixture = TestBed.createComponent(ContactListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
