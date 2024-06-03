import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsCalculatorComponent } from './tips-calculator.component';

describe('TipsCalculatorComponent', () => {
  let component: TipsCalculatorComponent;
  let fixture: ComponentFixture<TipsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
