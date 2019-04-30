import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { ClientHttpService } from '../../core/services/client-http.service';
import {
    GlobalActions,
    GlobalTypes,
    LoadCountriesAction,
    LoadCountriesErrorAction,
    LoadCountriesSuccessAction,
} from './global.action';

@Injectable()
export class GlobalEffects {
    @Effect()
    onLoadCountries$: Observable<GlobalActions> = this.actions$.pipe(
        ofType<LoadCountriesAction>(GlobalTypes.onLoadCountries),
        switchMap(() => this.http.onLoadCallingCodes().pipe(
            map(codes => new LoadCountriesSuccessAction(
                codes.map(el => ({
                    label: el.name,
                    code: el.alpha2Code,
                    value: el.callingCodes[0],
                })),
            )),
            catchError(error => of(new LoadCountriesErrorAction(error))),
        )),
    );

    @Effect({dispatch: false})
    onError$: Observable<void> = this.actions$.pipe(
        ofType<LoadCountriesErrorAction>
        (GlobalTypes.onLoadCountriesError),
        map(action => action.payload),
        tap(e => {
            console.error(e.message);
        }),
        switchMap(() => EMPTY),
    );

    constructor(
        private actions$: Actions,
        private http: ClientHttpService,
    ) {
    }

}
