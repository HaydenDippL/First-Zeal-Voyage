import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

import { state_sales_taxes, StateSalesTax } from './state-sales-tax';

@Component({
  selector: 'app-tips-calculator',
  standalone: true, 
  imports: [
    CardModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    SliderModule,
    InputTextModule
  ],
  templateUrl: './tips-calculator.component.html',
  styleUrl: './tips-calculator.component.css'
})
export class TipsCalculatorComponent {
  state_sales_taxes: StateSalesTax[] = state_sales_taxes;
  selected_state: StateSalesTax | undefined;
  price: number | undefined;
  tax_rate: number = 0;
  include_tax_in_tip: boolean = false;
  tip_rate: number = 20;

  calculate_tax(): number {
    return (this.price ?? 0) * (this.tax_rate ?? 0) / 100;
  }
  calculate_tip(): number {
    return (this.price ?? 0) * (this.tip_rate / 100);
  }
  calculate_total(): number {
    let tax: number = this.calculate_tax();
    let tip: number = this.calculate_tip();
    return (this.price ?? 0) + tax + tip;
  }

  zero_tax_rate(): void {
    this.tax_rate = 0;
  }

  nullify_state(): void {
    this.selected_state = undefined;
  }

  nullify_tax_rate_and_state(): void {
    this.zero_tax_rate();
    this.nullify_state();
  }

  set_tax_rate(): void {
    this.tax_rate = this.selected_state!.tax;
  }
}