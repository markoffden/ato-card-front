import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCardComponent } from './get-card.component';

describe('GetCardComponent', () => {
  let component: GetCardComponent;
  let fixture: ComponentFixture<GetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
