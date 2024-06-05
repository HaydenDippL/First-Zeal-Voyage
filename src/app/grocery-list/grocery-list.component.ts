import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';

import { DateTime } from 'luxon';

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

type task = {
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
    CardModule
  ],
  templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.css'
})
export class GroceryListComponent {
  list: task[] = [ // dummy data
    {
      grocery: "Eggs",
      quantity: 1,
      tags: [Tag.urgent, Tag.meat],
      date: DateTime.local(2024, 6, 4, 12, 30),
      due: DateTime.local(2024, 6, 5, 6, 30),
      assigned: "Thomas"
    },
    {
      grocery: "Carrots",
      quantity: 5,
      tags: [Tag.nonessential, Tag.vegetable],
      date: DateTime.local(2024, 6, 4, 12, 30),
      due: DateTime.local(2024, 6, 10, 18, 45),
      assigned: "Hayden"
    },
    {
      grocery: "Apples",
      quantity: 3,
      tags: [Tag.urgent, Tag.vegetable],
      date: DateTime.local(2024, 6, 4, 12, 30),
      due: DateTime.local(2024, 6, 5, 6, 30),
      assigned: null
    },
    {
      grocery: "Cinnamon",
      quantity: 1,
      tags: [Tag.spice],
      date: DateTime.local(2024, 6, 4, 12, 30),
      due: DateTime.local(2024, 6, 10, 18, 45),
      assigned: "Hayden"
    },
    {
      grocery: "Lobster",
      quantity: 20000,
      tags: [Tag.urgent, Tag.urgent, Tag.urgent, Tag.urgent, Tag.urgent, Tag.fruit],
      date: DateTime.local(2024, 6, 4, 12, 30),
      due: DateTime.local(2024, 6, 5, 6, 30),
      assigned: "Christian"
    },
  ];

  query: string | undefined;

  due_options = [DueFilter.overdue, DueFilter.today, DueFilter.day, DueFilter.week];
  due_filter: DueFilter | undefined;

  tag_options = [Tag.urgent, Tag.nonessential, Tag.meat, Tag.vegetable, Tag.fruit, Tag.spice];
  tag_filters: Tag[] = [];

  search(list: task[]): task[] {
    if (!this.query) return list;

    const lower_query: string = this.query.toLowerCase();
    return list.filter(item => {
      let grocery_match: boolean = item.grocery.toLowerCase().includes(lower_query);
      let name_match: boolean = item.assigned?.toLowerCase().includes(lower_query) ?? false;
      return grocery_match || name_match;
    });
  }

  filter(list: task[]): task[] {
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

  sort(list: task[]): task[] {
    return [];
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
