import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserManagementService } from 'app/admin/user-management/service/user-management.service';
import { Observable, debounceTime, delay, distinctUntilChanged, filter, map, mergeMap, of, pluck, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
/**
 * 5.2 Unwinding nested observables: the case of mergeMap
 *
 * `Projecting an observable onto another`
 *
 * Simple search box: use `map()` to transform a stream carrying a keyword entered by the user into an array of search results matching the term.
 *
 * 5.3 Mastering asynchronous streams
 * Example: Using a promise call to the Yohoo web service for Facebook's stock data.
 * Create observable from promise - Use wrapped promise to make HTTP call - Search stock quote for FB - Display price tick for FB
 *
 */
@Component({
  selector: 'mg-merge-map-opertor',
  templateUrl: './merge-map-opertor.component.html',
  styleUrls: ['./merge-map-opertor.component.scss']
})
export class MergeMapOpertorComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput!: ElementRef;
  editForm = this.fb.group({
    searchInput: ['']
  });

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService

  ) {
    console.error('Constructor');
   }

  ngOnInit(): void {
    console.error('ngOnInit');

  }

  ngAfterViewInit(): void {
    // const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
    //   pluck('target', 'value'),
    //   debounceTime(500),
    //   filter(searchValue => searchValue !== ''),
    //   tap((term: any) => console.error(`searching with term `, term)),
    //   mergeMap(searchValue => this.fetchData(searchValue))
    // ).subscribe( response => {
    //   console.error('Search Results are: ', response);
    // });
    this.editForm.get(['searchInput'])?.valueChanges.pipe(

      debounceTime(500),

      filter(searchValue => searchValue !== ''),

      distinctUntilChanged(),

      tap((term: any) => console.error(`searching with term `, term)),

      // Use `switchMap()` can cancel the previous request if the next search event triggerred before we receive the previous response.
      // Use `mergeMap()` cannot cancel the previous request

      // TODO Why no more valueChanges triggerred after the request failed ?
      mergeMap(searchValue => this.userManagementService.find(searchValue)),

    ).pipe(pluck('firstName')).subscribe(
       (response) => console.error('Search Results are: ', response));
  }

  fetchData(filterValue: string): Observable<{name: string, title: string}[]> {
    console.error('Begin to request... ')
    return of([{ name: filterValue, title: 'Filtering '.concat(filterValue)}]).pipe(delay(800));
  }

  handleAsynchronousePromblem(): void {
    console.error('FB Example Here');
  }
}
