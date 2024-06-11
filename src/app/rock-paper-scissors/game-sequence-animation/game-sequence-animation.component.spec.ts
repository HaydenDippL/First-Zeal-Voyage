import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSequenceAnimationComponent } from './game-sequence-animation.component';

describe('GameSequenceAnimationComponent', () => {
  let component: GameSequenceAnimationComponent;
  let fixture: ComponentFixture<GameSequenceAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSequenceAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameSequenceAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
