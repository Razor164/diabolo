import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { LoadCountriesAction } from './store/global/global.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    testPhone: string = '+375291142589';
    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(new LoadCountriesAction());
    }
}
