import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorsComponent } from './operators/operators.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MergeMapOpertorComponent } from './merge-map-opertor/merge-map-opertor.component';
import { BasicTableComponent } from './basic-table/basic-table.component';



@NgModule({
  declarations: [
    OperatorsComponent,
    MergeMapOpertorComponent,
    BasicTableComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'common-operators',
        component: OperatorsComponent
      },
      {
        path: 'merge-map',
        component: MergeMapOpertorComponent
      },
      {
        path: 'table',
        component: BasicTableComponent
      }
    ]),
    SharedModule,
    CommonModule
  ]
})
export class PracticeModule { }
