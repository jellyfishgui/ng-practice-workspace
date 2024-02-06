import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, Subscription, concat, delay, fromEvent, interval, merge, of, range, take } from 'rxjs';
import { concatMap, debounceTime, filter, map, mergeMap, pluck, switchAll, switchMap, takeUntil, tap } from 'rxjs/operators';
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
 *    - 01: Send HTTP request within the event's pipeline, such as using the search input to filter the data at server side.
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

  @ViewChild('searchInput') searchInput!: ElementRef<any>;

  searchControl = new FormControl('');

  intervalSubscription?: Subscription;

  specialCount = 0;

  specialCountLine2 = 0;

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

  /**
   * @function switchBasicUsage
   * @returns void
   * Switch to the latest observable data. Suppose you wanted a different behavior, such as canceling the first sequence when a new one begins emitting.
   * We can use `switchAll()` to handle the http request after the change event's pipeline.
   *
  */
  switchBasicUsage(): void {
    const observable = fromEvent(document, 'click')
    // Listens for any clicks on the page

    .pipe(

      // Maps another observable to the source observable
      map(click => range(1, 3)),

      // Using switchAll to begin emitting data from the projected observable
      switchAll(),

    ).subscribe(value => console.error('switch all output: ', value));

    merge(fromEvent(document, 'click'), range(1, 3)).subscribe(value => console.error('merge output: ', value));

    // Use to filter the data from the backend server.
    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      pluck('target', 'value'),

      // trigger change every 500 milliseconds
      debounceTime(500),

      tap((searchValue: any) => console.error(searchValue)),

      map((searchValue: any) => this.fetchData(searchValue)),

      switchAll()

    ).subscribe(result  => console.error(result))
  }

  intervalOperatorTest(): void {
    const productionLine = ['Line1', 'Line2'];
    const request$ = interval(3000).pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.fakeRequest(productionLine[0], 0)),
      map((res: any, index: number) => {
        console.error(res.name, this.specialCount);
      }),
      filter(() => productionLine.length > 1),
      switchMap(() => this.fakeRequest(productionLine[1], 1)),
      map((res: any, index: number) => {
        console.error(res.name, this.specialCount);
      })
    )
    request$.subscribe();
  }

  clearInterval(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchData(value: any): Observable<any[]> {
    return of(['Result '.concat(value)]).pipe(delay(5000));
  }

  private fakeRequest(lineName: string, lineIndex: number): Observable<any> {
    let defaultDelay = 500;
    if (lineIndex === 0) {
      this.specialCount++;
      console.error('request count', lineName, this.specialCount)
    }
    if (lineIndex === 1) {
      this.specialCountLine2++;
      console.error('request count', lineName, this.specialCountLine2)
    }

    if (this.specialCount === 7 || this.specialCountLine2 === 7) {
      defaultDelay = 3800;
    }

    return of({ name: lineName, data: []}).pipe(delay(defaultDelay));
  }

}
