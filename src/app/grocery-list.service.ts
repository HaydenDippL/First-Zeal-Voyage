import { Injectable } from '@angular/core';
import { response } from 'express';

import { DateTime } from 'luxon';

export enum Tag {
  urgent = "Urgent",
  nonessential = "Nonessential",
  meat = "Meat",
  vegetable = "Vegetable",
  fruit = "Fruit",
  spice = "Spice"
};

export const tag_options: Tag[] = [Tag.urgent, Tag.nonessential, Tag.meat, Tag.vegetable, Tag.fruit, Tag.spice];

export type Grocery = {
  grocery: string, // the name of the grocery
  quantity: number, // how many you're supposed to pick up
  units: string, // units, e.g. dozens, bushels, oz
  tags: Tag[], // e.g. vegetables, urgent, meats, etc...
  posted: DateTime, // when the item was posted (ALSO THE UUID for modification)
  pickup: DateTime | null, // when the item needs to be picked up
  assigned: string | null, // who is supposed to pick up the item
  completed: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private grocery_list: Grocery[] = [];

  constructor() {
    // this.fetch_grocery_list = this.fetch_grocery_list.bind(this);
    // this.fetch_grocery_list();

    this.grocery_list = [
      {
        grocery: "Eggs",
        quantity: 1,
        units: "dozen",
        tags: [Tag.urgent, Tag.meat],
        posted: DateTime.local(2024, 6, 4, 12, 30),
        pickup: DateTime.local(2024, 6, 5, 6, 30),
        assigned: "Thomas",
        completed: false
      },
      {
        grocery: "Carrots",
        quantity: 5,
        units: "",
        tags: [Tag.nonessential, Tag.vegetable],
        posted: DateTime.local(2024, 6, 4, 12, 30),
        pickup: DateTime.local(2024, 6, 10, 18, 45),
        assigned: "Hayden",
        completed: false
      },
      {
        grocery: "Apples",
        quantity: 3,
        units: "",
        tags: [Tag.urgent, Tag.vegetable],
        posted: DateTime.local(2024, 6, 4, 12, 30),
        pickup: DateTime.local(2024, 6, 5, 6, 30),
        assigned: null,
        completed: false
      },
      {
        grocery: "Cinnamon",
        quantity: 6,
        units: "ounces",
        tags: [Tag.spice],
        posted: DateTime.local(2024, 6, 4, 12, 30),
        pickup: DateTime.local(2024, 6, 10, 18, 45),
        assigned: "Hayden",
        completed: false
      },
      {
        grocery: "Lobster",
        quantity: 20000,
        units: "",
        tags: [Tag.urgent, Tag.urgent, Tag.urgent, Tag.urgent, Tag.urgent, Tag.fruit],
        posted: DateTime.local(2024, 6, 4, 12, 30),
        pickup: DateTime.local(2024, 6, 5, 6, 30),
        assigned: "Christian",
        completed: false
      }
    ]
  }

  // fetch_grocery_list(): void {
  //   console.log("hello")
  //   fetch("http://localhost:3000/grocery-list/get-grocery-list")
  //     .then(response => {
  //       if (!response.ok) throw new Error('Network response was not ok');
  //       else return response.json();
  //     })
  //     .then((data: Grocery[]) => {
  //       console.log(data);
  //       this.grocery_list = data;
  //     })
  //     .catch(err => console.error("Error fetching grocery list:", err));
  // }

  get_grocery_list(): Grocery[] {
    return this.grocery_list;
  }


  get_tag_options(): Tag[] {
    return tag_options;
  }

  add_grocery(grocery: Grocery): void {
    // TODO: add API call to add grocery on the backend
    // console.log("saving");
    this.grocery_list.push(grocery);
    // console.log(this.grocery_list);
    // const add_grocery_url = "http://localhost:3000/grocery-list/add-grocery"
    // const parameterized_add_grocery_url = add_params(add_grocery_url, grocery);
    // fetch(parameterized_add_grocery_url)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  }

  edit_grocery(posted: DateTime, new_grocery: Grocery): void {
    let edit_grocery_index: number = this.grocery_list.findIndex(grocery => grocery.posted === posted);
    if (edit_grocery_index === -1) {
      console.log(`The grocery item posted at ${posted} no longer exists...`);
    } else {
      new_grocery.posted = posted;
      this.grocery_list.splice(edit_grocery_index, 1, new_grocery)
    }

    // const edit_grocery_url = "http://localhost:3000/grocery-list/edit-grocery-list";
    // const parameterized_edit_grocery_url = add_params(edit_grocery_url, new_grocery);
    // fetch(parameterized_edit_grocery_url)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  }

  delete_grocery(posted: DateTime): void {
    console.log("helo")
    console.log(posted);
    console.log(this.grocery_list);
    let remove_grocery_index: number = this.grocery_list.findIndex(grocery => grocery.posted === posted);
    console.log(remove_grocery_index);
    if (remove_grocery_index === -1) {
      console.log(`The grocery item posted ${posted} already doesn't exist and cannot be removed...`);
    } else {
      this.grocery_list.splice(remove_grocery_index, 1);
    }

    // const delete_grocery_url = "http://localhost:3000/grocery-list/delete-grocery"
    // const parameterized_delete_grocery_url = add_params(delete_grocery_url, {posted: posted});
    // fetch(parameterized_delete_grocery_url)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  }

  delete_grocery_list(): void {
    // TODO: add API call to delete the grocery list on the backend
    // TODO: add the full delete button

    this.grocery_list = [];
  }
}


function add_params(baseUrl: string, params: any) {
  // Create a URL object from the base URL
  const url = new URL(baseUrl);

  // Create a URLSearchParams object from the params object
  const urlParams = new URLSearchParams(params);

  // Append each parameter to the URL's search string
  urlParams.forEach((value, key) => {
      url.searchParams.append(key, value);
  });

  // Return the updated URL as a string
  return url.toString();
}