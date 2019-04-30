import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryCode } from '../../core/models/country-code';

export enum GlobalTypes {
    onLoadCountries = '[COUNTRIES] load countries [...]',
    onLoadCountriesSuccess = '[COUNTRIES] load countries [SUCCESS]',
    onLoadCountriesError = '[COUNTRIES] load countries [ERROR]',
}

// LOAD COUNTRIES
export class LoadCountriesAction implements Action {
    readonly type = GlobalTypes.onLoadCountries;
}

export class LoadCountriesSuccessAction implements Action {
    readonly type = GlobalTypes.onLoadCountriesSuccess;

    constructor(public payload: CountryCode[]) {
    }
}

export class LoadCountriesErrorAction implements Action {
    readonly type = GlobalTypes.onLoadCountriesError;

    constructor(public payload: HttpErrorResponse) {
    }
}

export type GlobalActions
    = LoadCountriesAction
    | LoadCountriesSuccessAction
    | LoadCountriesErrorAction
    ;
