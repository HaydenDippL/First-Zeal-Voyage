import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

import { DateTime } from 'luxon';
import { Grocery, Tag } from '../../grocery-list.service';

import { GroceryItemComponent } from '../grocery-item/grocery-item.component';
import { GroceryListService } from '../../grocery-list.service';

@Component({
  selector: 'app-edit-creation-popup',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    CalendarModule,
    FormsModule,
    GroceryItemComponent,
    CommonModule,
    CheckboxModule
  ],
  templateUrl: './edit-creation-popup.component.html',
  styleUrl: './edit-creation-popup.component.css'
})
export class EditCreationPopupComponent {
  @Input() grocery: Grocery | undefined;
  @Input() mode: string = 'create';
  @Input() visible: boolean = false;
  grocery_list_service = inject(GroceryListService);

  temp_grocery!: Grocery;
  js_due_date: Date | undefined;

  ngOnInit() {
    if (this.mode === 'create') {
      this.temp_grocery = this.create_blank_grocery();
    } else { // this.mode === 'edit'
      this.temp_grocery = {
        grocery: this.grocery!.grocery,
        quantity: this.grocery!.quantity,
        units: this.grocery!.units,
        tags: this.grocery!.tags,
        posted: this.grocery!.posted,
        pickup: this.grocery!.pickup,
        assigned: this.grocery!.assigned,
        completed: false
      }
      if (this.temp_grocery.pickup) this.js_due_date = this.temp_grocery.pickup.toJSDate();
    }
  }

  save() {
    if (this.mode === 'create') {
      this.temp_grocery.posted = DateTime.now();
      this.grocery_list_service.add_grocery(this.temp_grocery);
    } else { // this.mode === 'edit'
      this.grocery_list_service.edit_grocery(this.grocery!.posted, this.temp_grocery);
    }

    this.temp_grocery = this.create_blank_grocery();

    this.visible = false;
  }

  update_temp_grocery_date(): void {
    if (this.js_due_date) this.temp_grocery.pickup = DateTime.fromJSDate(this.js_due_date);
  }

  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  on_exit(): void {
    this.exit.emit();
    // this.visible = false;
  }

  create_blank_grocery() {
    return {
      grocery: "",
      quantity: 0,
      units: "",
      tags: [],
      posted: DateTime.now(), // changed in save() to a new DateTime.now()
      pickup: null,
      assigned: null,
      completed: false
    };
  }
}
