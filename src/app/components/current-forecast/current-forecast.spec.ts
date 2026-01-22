import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentForecast } from './current-forecast';

describe('CurrentForecast', () => {
  let component: CurrentForecast;
  let fixture: ComponentFixture<CurrentForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentForecast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
