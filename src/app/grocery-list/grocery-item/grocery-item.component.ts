import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { DateTime } from 'luxon';
import { Grocery } from '../../grocery-list.service';

import { GroceryListService } from '../../grocery-list.service';

// TODO: Add a better and more indicative crossout feature
// TODO: Change the preview helpers to Who? What? When?

@Component({
  selector: 'app-grocery-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.css'
})
export class GroceryItemComponent {
  @Input() grocery!: Grocery;
  @Input() preview: boolean = false;

  grocery_list_service = inject(GroceryListService);

  now!: DateTime;

  display_edit_menu: boolean = false;

  ngOnInit() {
    this.now = DateTime.now();
  }
  
  toggle_edit_menu(): void {
    this.display_edit_menu = !this.display_edit_menu;
  }
}
