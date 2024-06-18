import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiLoComponent } from './hi-lo.component';

describe('HiLoComponent', () => {
  let component: HiLoComponent;
  let fixture: ComponentFixture<HiLoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiLoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HiLoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
