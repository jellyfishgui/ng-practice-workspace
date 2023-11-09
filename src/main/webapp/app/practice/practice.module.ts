import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorsComponent } from './operators/operators.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



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
    SharedModule,
    CommonModule
  ]
})
export class PracticeModule { }
