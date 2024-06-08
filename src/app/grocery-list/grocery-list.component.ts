import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { DateTime } from 'luxon';

import { GroceryListService } from '../grocery-list.service';

import { GroceryItemComponent } from './grocery-item/grocery-item.component';
import { EditCreationPopupComponent } from './edit-creation-popup/edit-creation-popup.component';

enum Tag {
  urgent = "Urgent",
  nonessential = "Nonessential",
  meat = "Meat",
  vegetable = "Vegetable",
  fruit = "Fruit",
  spice = "Spice"
}

enum DueFilter {
  overdue = "Overdue",
  today = "Due Today",
  day = "Due in One Day",
  week = "Due in One Week"
}

enum Sorts {
  alphabetical = "Alphabetical",
  due_date = "Due Date",
  post_date = "Post Date",
  days_til_due = "Days Til Due",
  assigned = "Assigned"
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
  selector: 'app-grocery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule,
    InputNumberModule,
    CalendarModule,
    CardModule,
    ButtonModule,
    DialogModule,
    GroceryItemComponent,
    EditCreationPopupComponent
  ],
  templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.css'
})
export class GroceryListComponent {
  grocery_list_service = inject(GroceryListService);
  
  add_to_list_dialog_visible: boolean = false;
  show_dialog(): void {
    this.add_to_list_dialog_visible = true;
    this.temp_date = DateTime.now();
  }

  convert_js_date_to_luxon(date: Date): DateTime {
    return DateTime.fromJSDate(date);
  }

  temp_grocery: string | undefined;
  temp_quantity: number = 1;
  temp_tags!: Tag[];
  temp_due: Date[] | undefined;
  temp_date!: DateTime;
  temp_assigned: string | undefined;
  add_grocery() {
    // TODO:

    // if (this.temp_grocery && this.temp_quantity && this.temp_tags && this.temp_due?.length === 1) {
    //   this.list.push({
    //     grocery: this.temp_grocery,
    //     quantity: this.temp_quantity,
    //     tags: this.temp_tags,
    //     due: DateTime.fromJSDate(this.temp_due[0]),
    //     date: DateTime.now(),
    //     assigned: this.temp_assigned
    //   })
    // } else {
    //   // missing required info
    // }
  }



  search_filter_sort(): Grocery[] {
    return this.sort(this.search(this.filter(this.grocery_list_service.get_grocery_list())));
  }
  
  query: string | undefined;
  search(list: Grocery[]): Grocery[] {
    if (!this.query) return list;
    
    const lower_query: string = this.query.toLowerCase();
    return list.filter(item => {
      let grocery_match: boolean = item.grocery.toLowerCase().includes(lower_query);
      let name_match: boolean = item.assigned?.toLowerCase().includes(lower_query) ?? false;
      return grocery_match || name_match;
    });
  }
  
  due_options = [DueFilter.overdue, DueFilter.today, DueFilter.day, DueFilter.week];
  due_filter: DueFilter | undefined;

  tag_options = [Tag.urgent, Tag.nonessential, Tag.meat, Tag.vegetable, Tag.fruit, Tag.spice];
  tag_filters: Tag[] = [];
  filter(list: Grocery[]): Grocery[] {
    const now: DateTime = DateTime.now();
    return list.filter(item => {
      let due_match: boolean = true;
      if (item.due === null) {
        due_match = false;
      } else if (this.due_filter === DueFilter.overdue) {
        due_match = now > item.due;
      } else if (this.due_filter === DueFilter.today) {
        due_match = now.day === item.due.day && now.month === item.due.month && now.year === item.due.year && now < item.due;
      } else if (this.due_filter === DueFilter.day) {
        const day: DateTime = now.plus({days: 1});
        due_match = item.due < day && item.due > now;
      } else if (this.due_filter === DueFilter.week) {
        const week: DateTime = now.plus({days: 7});
        due_match = item.due < week && item.due > now;
      }
      
      let tag_match: boolean = true;
      if (this.tag_filters.length !== 0) {
        tag_match = this.tag_filters.some(tag_filter => item.tags.some(tag => tag_filter === tag));
      }
      
      return due_match && tag_match;
    });
  }

  sort_options: Sorts[] = [Sorts.alphabetical, Sorts.due_date, Sorts.days_til_due, Sorts.post_date, Sorts.assigned];
  sort_selected: Sorts | undefined;
  sort(list: Grocery[]): Grocery[] {
    if (this.sort_selected === undefined) return list;
    else if (this.sort_selected === Sorts.alphabetical) {
      return list.sort((a, b) => spaceship(a.grocery.toLowerCase(), b.grocery.toLowerCase()));
    } else if (this.sort_selected === Sorts.due_date) {
      return list.sort((a, b) => spaceship(a.due, b.due));
    } else if (this.sort_selected === Sorts.days_til_due) {
      const now: DateTime = DateTime.now();
      return list.sort((a, b) => {
        return spaceship((a.due) ? now.diff(a.due).as('milliseconds') : undefined, 
          (b.due) ? now.diff(b.due).as('milliseconds') : undefined);
      });
    } else if (this.sort_selected === Sorts.post_date) {
      return list.sort((a, b) => spaceship(a.date, b.date));
    } else {
      return list.sort((a, b) => spaceship(a.assigned, b.date));
    }
  }

  display_due(due: DateTime): string {
    const now: DateTime = DateTime.now();
    if (due.year !== now.year) return due.toFormat("ccc',' LLL d 'at' T");
    else return due.toFormat("ccc',' LLL d',' yyyy 'at' T");
  }

  display_date(date: DateTime): string {
    const now: DateTime = DateTime.now();
    if (date.year !== now.year) return date.toFormat("LLL d',' yyyy");
    else return date.toFormat("LLL d");
  }
}

type comparable = string | DateTime | number | undefined | null;
function spaceship(a: comparable, b: comparable): number {
  if (!a && !b) return 0;
  else if (!a) return 1;
  else if (!b) return -1;
  else if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
}