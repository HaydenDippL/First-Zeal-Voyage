import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type coord = {
  x: number,
  y: number
}

type line = {
  p1: coord,
  p2: coord,
  color: string;
}


@Component({
  selector: 'app-compass',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './compass.component.html',
  styleUrl: './compass.component.css'
})
export class CompassComponent {
  @Input() size!: number;
  padding!: number;
  line_length!: number;
  radius!: number;
  deg_increment: number = 5;

  dial_lines: line[] = [];

  ngOnInit() {
    this.line_length = this.size / 20;
    this.padding = this.size / 10;
    this.radius = this.size / 2 - this.padding;
    this.create_dial();
  }

  create_dial(): void {
    const center: coord = {x: this.size / 2, y: this.size / 2};
    const rad_increment: number = this.deg_increment * Math.PI / 180;
    for (let rad = 0, deg = 0; rad < 2 * Math.PI; rad += rad_increment, deg += this.deg_increment) {

      const inside_point: coord = {
        x: center.x + this.radius * Math.cos(rad),
        y: center.y + this.radius * Math.sin(rad)
      };
      const outside_point: coord = {
        x: center.x + (this.radius + this.line_length) * Math.cos(rad),
        y: center.y + (this.radius + this.line_length) * Math.sin(rad)
      };

      let color: string;
      if (deg % 90 === 0) color = 'black';
      else if (deg % 30 === 0) color = 'red';
      else color = 'gray';

      this.dial_lines.push({
        p1: inside_point,
        p2: outside_point,
        color: color
      });
    }
  }

  create_arrow_head_path(): string {
    const top: coord = {
      x: 0.5 * this.size,
      y: this.padding - this.line_length
    };
    const left: coord = {
      x: 0.47 * this.size,
      y: 1.2 * this.padding
    }
    const middle: coord = {
      x: 0.5 * this.size,
      y: this.padding
    }
    const right: coord = {
      x: 0.53 * this.size,
      y: 1.2 * this.padding
    }
    
    return `M ${top.x} ${top.y} L ${left.x} ${left.y} L ${middle.x} ${middle.y} L ${right.x} ${right.y} L ${top.x} ${top.y}`;
  }
}
