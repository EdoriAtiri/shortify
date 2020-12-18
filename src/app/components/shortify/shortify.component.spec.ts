import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortifyComponent } from './shortify.component';

describe('ShortifyComponent', () => {
  let component: ShortifyComponent;
  let fixture: ComponentFixture<ShortifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
