import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, concat, delay, fromEvent, interval, merge, of, range, take } from 'rxjs';
import { map, mergeAll, switchAll, switchMap, switchMapTo, tap } from 'rxjs/operators';
/**
 * Strategies
 * 1. Interleave events by merging streams
 *
 *  - `merge()` can accept either an array or a variable number of streams that are to have their outputs
 *    merged into one.
 *  -
 *
 *  Scenarios:
 *  - Handle different events with one Observable object, such as print mouse coordinates of both touch
 *    and click event
 *
 * 2. Preserve order of events by concatenating streams
 *  - In other scenarios, you might be more interest in preserving the order of entire observable sequence.
 *    Such as you want receive all the events from source1$, then all the events from source2$, we refer
 *    `concat()` operator.
 *  - `concat(...stream)`
 *
 * 3. Switch to the latest stream data
 *
 *  - Suppose you want  a different behavior, such as cancelling the first sequence when a new one begins emitting.
 *
 *
 *
*/
@Component({
  selector: 'mg-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor() {
    console.error('');
  }

  ngOnInit(): void {
    console.error('Init')
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  concatOperator(): void {
    const source1$ = range(1, 3).pipe(delay(3000));
    const source2$ = of('a', 'b', 'c');
    concat(source1$, source2$).subscribe(value => console.error(value))
  }

  mergeOperator(): void {
    const source1$ = interval(1000).pipe(
      map(x => `Source 1:  ${x}`),
      take(3)
    );
    const source2$ = interval(1000).pipe(
      map(y => `Source 2:  ${y}`),
      take(3)
    );
    merge(source1$, source2$).subscribe(value => console.error('Merge: ', value));
  }

  concatIntervalSource(): void {
    const source1$ = interval(1000).pipe(
      map(x => `Source 1:  ${x}`),
      take(3)
    );
    const source2$ = interval(1000).pipe(
      map(y => `Source 2: ${y}`),
      take(3)
    );
    concat(source1$, source2$).subscribe(value => console.error('Concat: ', value));
  }

  mergeMouseUpAndTouchEnd(): void {
    const mouseUp$ = fromEvent(document, 'mouseup');
    const touchEnd$ = fromEvent(document, 'touchend');
    merge(mouseUp$, touchEnd$).pipe(
      tap(event => console.error(event.type)),
      map((event: any) => {
        let position;
        switch (event.type) {
          case 'touchend':
            position = Object.assign({}, {
              left: event?.changedTouches[0]?.clientX,
              top: event?.changedTouches[0]?.clientY
            });
            break;
          case 'mouseup':
            position = Object.assign({}, {
              left: event?.clientX,
              top: event?.clientY
            });
        }
        return position;
      })
    ).subscribe((obj: any) => console.error('Left: ', obj?.left, 'Top: ', obj?.top))
  }

  switchBasic(): void {
    const observable = fromEvent(document, 'click').pipe(
      map(click => range(1, 3)),
      switchAll(),
    ).subscribe(value => console.error('switch all output: ', value));

    merge(fromEvent(document, 'click'), range(1, 3)).subscribe(value => console.error('merge output: ', value))

  }

}
