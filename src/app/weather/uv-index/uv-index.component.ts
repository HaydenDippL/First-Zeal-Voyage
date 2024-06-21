import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uv-index',
  standalone: true,
  imports: [],
  templateUrl: './uv-index.component.html',
  styleUrl: './uv-index.component.css'
})
export class UvIndexComponent {
  @Input() uv!: number;
}
