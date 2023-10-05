import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  currentSearch = this.searchSubject.asObservable();

  constructor() {}

  changeSearch(search: string) {
    this.searchSubject.next(search);
  }

  setSearchTerm(term: string) {
    this.searchSubject.next(term);
  }

  getSearchTerm() {
    return this.searchSubject.asObservable();
  }

}
