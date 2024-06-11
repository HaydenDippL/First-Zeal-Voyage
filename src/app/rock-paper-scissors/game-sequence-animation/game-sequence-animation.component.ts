import { Component, Input } from '@angular/core';

import { Move } from '../../rock-paper-scissors.service';

const fists = ['✊', '✊🏻', '✊🏼', '✊🏽', '✊🏾', '✊🏿'];

@Component({
  selector: 'app-game-sequence-animation',
  standalone: true,
  imports: [],
  templateUrl: './game-sequence-animation.component.html',
  styleUrl: './game-sequence-animation.component.css'
})
export class GameSequenceAnimationComponent {
  @Input() prev_user_moves!: Move[];
  @Input() user_move!: Move;
  user_fist!: string;
  ai_fist!: string;
  ai_move!: Move;

  ngOnInit(): void {
    this.user_fist = this.get_random_fist();
    this.ai_fist = this.get_random_fist();

    // FIXME: Call backend AI Algo and store results

    // FIXME: determine win/tie/loss
    
    // FIXME: Trigger the animation after move has been fetched from API
  }

  get_random_fist(): string {
    const index = Math.floor(Math.random() * fists.length);
    return fists[index];
  }
}
