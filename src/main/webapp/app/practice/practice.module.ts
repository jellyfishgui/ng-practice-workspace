import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorsComponent } from './operators/operators.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OperatorsComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'common-operators',
        component: OperatorsComponent
      }
    ]),
    CommonModule
  ]
})
export class PracticeModule { }
