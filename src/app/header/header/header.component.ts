import {Component} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        trigger('expandCollapse', [
            state('collapsed', style({
                width: '100px',
            })),
            state('expanded', style({
                width: '30%',
            })),
            transition('collapsed <=> expanded', animate('300ms ease-out'))
        ]),
        trigger('fadeInOut', [
            state('in', style({opacity: 1})),
            state('out', style({opacity: 0})),
            transition('in <=> out', animate('200ms ease-out'))
        ])
    ]
})

export class HeaderComponent {
    searchFocused = false;
    searchText = '';

    isSearchBarFocused(): boolean {
        return this.searchFocused || this.searchText.length > 0;
    }


    getFadeState(): string {
        return this.shouldIconsFade() ? 'out' : 'in';
    }

    shouldIconsFade(): boolean {
        return this.searchFocused || this.searchText.length > 0;
    }

}