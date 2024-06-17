import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

import { DateTime } from 'luxon';
import { Grocery } from '../../grocery-list.service';

import { EditCreationPopupComponent } from '../edit-creation-popup/edit-creation-popup.component';
import { GroceryListService } from '../../grocery-list.service';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    TooltipModule,
    CommonModule,
    EditCreationPopupComponent
  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent {
  @Input() grocery!: Grocery;
  @Input() post_date!: DateTime;

  grocery_list_service = inject(GroceryListService);

  display_edit_menu: boolean = false;

  toggle_completed() {
    this.grocery.completed = !this.grocery.completed
    this.grocery_list_service.edit_grocery(this.post_date, this.grocery)
  }

  toggle_edit_menu() {
    this.display_edit_menu = !this.display_edit_menu;
  }

  trash() {
    console.log("delete");
    console.log(this.post_date);
    this.grocery_list_service.delete_grocery(this.post_date);
  }
}
