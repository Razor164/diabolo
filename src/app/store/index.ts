import { InjectionToken } from '@angular/core';
import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { MetaReducer } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { GlobalEffects } from './global/global.effect';
import { environment } from '../../environments/environment';
import * as global from './global/global.reducer';

export interface AppState {
    global: global.GlobalState;
}

export const appReducers: ActionReducerMap<AppState> = {
    global: global.reducer,
};

export const APP_EFFECTS = [
    GlobalEffects,
];

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export const reducerProvider = [
    {provide: REDUCERS_TOKEN, useValue: appReducers},
];

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log(state, action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger, storeFreeze]
    : [];
