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
import { CheckboxModule } from 'primeng/checkbox';

import { DateTime } from 'luxon';

import { GroceryListService, Grocery, Tag } from '../grocery-list.service';

import { GroceryItemComponent } from './grocery-item/grocery-item.component';
import { EditCreationPopupComponent } from './edit-creation-popup/edit-creation-popup.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

enum DueFilter {
  overdue = "Overdue",
  today = "Today",
  day = "Tomorrow",
  week = "Week"
}

enum Sorts {
  alphabetical = "Alphabetical",
  due_date = "Due Date",
  post_date = "Post Date",
  days_til_due = "Days Til Due",
  assigned = "Assigned"
}

// FIXME: animate groceries coming in an out of frame

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    InputNumberModule,
    CalendarModule,
    CardModule,
    ButtonModule,
    DialogModule,
    GroceryItemComponent,
    EditCreationPopupComponent,
    ActionButtonsComponent,
  ],
  templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.css'
})
export class GroceryListComponent {
  grocery_list_service = inject(GroceryListService);
  
  create_menu_visible: boolean = false;
  
  toggle_create_menu(): void {
    this.create_menu_visible = !this.create_menu_visible;
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

  // TODO: something wrong with the date filters
  
  due_options = [DueFilter.overdue, DueFilter.today, DueFilter.day, DueFilter.week];
  due_filter: DueFilter | undefined;

  tag_filters: Tag[] = [];
  filter(list: Grocery[]): Grocery[] {
    if (this.tag_filters.length === 0) return list;

    const now: DateTime = DateTime.now();
    return list.filter(item => {
      let due_match: boolean = true;
      if (item.pickup === null) {
        due_match = false;
      } else if (this.due_filter === DueFilter.overdue) {
        due_match = now > item.pickup;
      } else if (this.due_filter === DueFilter.today) {
        due_match = now.day === item.pickup.day && now.month === item.pickup.month && now.year === item.pickup.year && now < item.pickup;
      } else if (this.due_filter === DueFilter.day) {
        const day: DateTime = now.plus({days: 1});
        due_match = item.pickup < day && item.pickup > now;
      } else if (this.due_filter === DueFilter.week) {
        const week: DateTime = now.plus({days: 7});
        due_match = item.pickup < week && item.pickup > now;
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
      return list.sort((a, b) => spaceship(a.pickup, b.pickup));
    } else if (this.sort_selected === Sorts.days_til_due) {
      const now: DateTime = DateTime.now();
      return list.sort((a, b) => {
        return spaceship((a.pickup) ? now.diff(a.pickup).as('milliseconds') : undefined, 
          (b.pickup) ? now.diff(b.pickup).as('milliseconds') : undefined);
      });
    } else if (this.sort_selected === Sorts.post_date) {
      return list.sort((a, b) => spaceship(a.posted, b.posted));
    } else {
      return list.sort((a, b) => spaceship(a.assigned, b.assigned));
    }
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