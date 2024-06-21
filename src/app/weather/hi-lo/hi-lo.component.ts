import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hi-lo',
  standalone: true,
  imports: [],
  templateUrl: './hi-lo.component.html',
  styleUrl: './hi-lo.component.css'
})
export class HiLoComponent {
  @Input() hi!: number;
  @Input() lo!: number
}
