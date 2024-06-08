import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

import { DateTime } from 'luxon';

import { GroceryItemComponent } from '../grocery-item/grocery-item.component';

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
    GroceryItemComponent
  ],
  templateUrl: './edit-creation-popup.component.html',
  styleUrl: './edit-creation-popup.component.css'
})
export class EditCreationPopupComponent {
  @Input() grocery: Grocery | undefined;
  @Input() mode: string = 'create';
  @Input() visible: boolean = false;

  ngOnInit() {
    if (!this.grocery) this.grocery = {
      grocery: "",
      quantity: 0,
      tags: [],
      date: DateTime.now(), // TODO: change so that this is datetime on post
      due: null,
      assigned: null
    }
  }

  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  on_exit(): void {
    this.exit.emit();
    this.visible = false;
  }

  // temp_grocery!: Grocery;

  // temp_grocery: Grocery = JSON.parse(JSON.stringify(this.grocery));
  tag_options = [Tag.urgent, Tag.nonessential, Tag.meat, Tag.vegetable, Tag.fruit, Tag.spice];
  temp_grocery = {
    grocery: "Lobster",
    quantity: 20000,
    tags: [Tag.urgent, Tag.fruit],
    date: DateTime.local(2024, 6, 4, 12, 30),
    due: DateTime.local(2024, 6, 5, 6, 30),
    assigned: "Christian"
  }

  // ngOnInit() {
  //   this.temp_grocery = JSON.parse(JSON.stringify(this.grocery));
  // }
}
