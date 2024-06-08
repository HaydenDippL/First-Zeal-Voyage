import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { DateTime } from 'luxon';

import { GroceryListService } from '../../grocery-list.service';
import { EditCreationPopupComponent } from '../edit-creation-popup/edit-creation-popup.component';

enum Tag {
  urgent = "Urgent",
  nonessential = "Nonessential",
  meat = "Meat",
  vegetable = "Vegetable",
  fruit = "Fruit",
  spice = "Spice"
}

type Grocery = {
  grocery: string, // the name of the grocery
  quantity: number, // how many you're supposed to pick up
  tags: Tag[], // e.g. vegetables, urgent, meats, etc...
  date: DateTime, // when the item was posted (ALSO THE UUID for modification)
  due: DateTime | null, // when the item needs to be picked up
  assigned: string | null, // who is supposed to pick up the item
}

@Component({
  selector: 'app-grocery-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule, EditCreationPopupComponent],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.css'
})
export class GroceryItemComponent {
  @Input() actions: boolean = true;
  @Input() grocery!: Grocery;

  grocery_list_service = inject(GroceryListService);

  now!: DateTime;
  
  checked: boolean = false;
  display_edit_menu: boolean = false;

  ngOnInit() {
    this.now = DateTime.now();
  }

  toggle_completed(): void {
    this.checked = !this.checked;
  }
    
  toggle_edit_menu(): void {
    this.display_edit_menu = !this.display_edit_menu;
  }
}
