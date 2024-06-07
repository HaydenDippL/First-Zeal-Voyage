import { Injectable } from '@angular/core';

import { DateTime } from 'luxon';

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

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private grocery_list!: Grocery[];

  constructor() {
    // TODO: change this to a API call to a database
    this.grocery_list = [
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
      }
    ]
  }

  get_grocery_list(): Grocery[] {
    return this.grocery_list;
  }

  add_grocery(grocery: Grocery): void {
    // TODO: add API call to add grocery on the backend
    this.grocery_list.push(grocery);
  }

  edit_grocery(posted_date: DateTime, new_grocery: Grocery): void {
    // TODO: add API call to edit grocery on the backend

    let edit_grocery_index: number = this.grocery_list.findIndex(grocery => grocery.date === posted_date);

    if (edit_grocery_index === -1) {
      console.log(`The grocery item posted at ${posted_date} no longer exists...`);
    } else {
      new_grocery.date = posted_date;
      this.grocery_list.splice(edit_grocery_index, 1, new_grocery)
    }
  }

  delete_grocery(posted_date: DateTime): void {
    // TODO: add API call to delete grocery on the backend

    let remove_grocery_index: number = this.grocery_list.findIndex(grocery => grocery.date === posted_date);

    if (remove_grocery_index === -1) {
      console.log(`The grocery item posted ${posted_date} already doesn't exist and cannot be removed...`);
    } else {
      this.grocery_list.splice(remove_grocery_index, 1);
    }
  }

  delete_grocery_list(): void {
    // TODO: add API call to delete the grocery list on the backend

    this.grocery_list = [];
  }
}
