import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, concat, delay, interval, merge, of, range, take, timer } from 'rxjs';

@Component({
  selector: 'mg-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit, OnDestroy {

  source1$ = of(1,2,3);
  source2$ = of('a', 'b', 'c');
  observer$ = null;
  source3$ = range(1, 3).pipe(delay(3000))
  destroy$ = new Subject<void>();

  constructor() {
    console.error('');
   }

  ngOnInit(): void {
    merge(interval(1000).pipe(take(10)), interval(2000).pipe(take(5))).subscribe(value => console.error(value))
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
