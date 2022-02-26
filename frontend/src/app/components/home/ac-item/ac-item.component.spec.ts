import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcItemComponent } from './ac-item.component';

describe('AcItemComponent', () => {
  let component: AcItemComponent;
  let fixture: ComponentFixture<AcItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
