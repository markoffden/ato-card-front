import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletListItemComponent } from './outlet-list-item.component';

describe('OutletListItemComponent', () => {
  let component: OutletListItemComponent;
  let fixture: ComponentFixture<OutletListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
