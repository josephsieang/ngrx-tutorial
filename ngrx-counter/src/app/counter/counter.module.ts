import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterDisplayComponent } from './counter-display/counter-display.component';
import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent
  }
];

@NgModule({
  declarations: [CounterComponent, CounterDisplayComponent, CounterButtonsComponent, CustomCounterInputComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule]
})
export class CounterModule {}
