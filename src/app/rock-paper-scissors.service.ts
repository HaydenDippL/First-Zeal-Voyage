import { Injectable } from '@angular/core';

export enum Move {
  rock = "ROCK",
  paper = "PAPER",
  scissors = "SCISSORS"
}

@Injectable({
  providedIn: 'root'
})
export class RockPaperScissorsService {
  private lifetime_user_wins!: number;
  private lifetime_ai_wins!: number;
  private session_user_wins!: number;
  private session_ai_wins!: number;

  private previous_user_moves: Move[] = [];

  constructor() { 
    // FIXME: add API call to backend to get total winnings for this user
  }

  get_ai_move(): Move {
    // FIXME: add API call to backend to get AIs move
    return Move.rock;
  }

  get_lifetime_user_wins(): number {
    return this.lifetime_user_wins;
  }

  get_lifetime_ai_wins(): number {
    return this.lifetime_ai_wins;
  }

  get_session_user_wins(): number {
    return this.session_user_wins;
  }

  get_session_ai_wins(): number {
    return this.session_ai_wins;
  }

  did_user_win(user_move: Move, ai_move: Move): string {
    if (user_move === ai_move) return 'tie';
    if (user_move === Move.rock && ai_move === Move.scissors || 
      user_move === Move.paper && ai_move === Move.rock || 
      user_move === Move.scissors && ai_move === Move.paper) return 'win';
    else return 'loss'
  }

  record_user_move(user_move: Move): void {
    // FIXME: add API call to backend to record the played move along with the previous moves (maybe the result of the match, too)
  }

  record_user_win(): void {
    // FIXME: add API call
  }

  record_ai_win(): void {
    // FIXME: add API call
  }
}
