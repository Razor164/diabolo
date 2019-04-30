import { AppState } from '../index';
import { GlobalActions, GlobalTypes } from './global.action';
import { CountryCode } from '../../core/models/country-code';

export class GlobalState {
    isCountriesLoading: boolean;
    callingCodes: CountryCode[];
}

export function reducer(state = new GlobalState(), action: GlobalActions): GlobalState {
    switch (action.type) {
        // LOGIN
        case GlobalTypes.onLoadCountries:
            return {
                ...state,
                isCountriesLoading: true,
            };
        case GlobalTypes.onLoadCountriesError:
            return {
                ...state,
                isCountriesLoading: false,
            };
        case GlobalTypes.onLoadCountriesSuccess:
            return {
                ...state,
                isCountriesLoading: false,
                callingCodes: action.payload,
            };
        default: {
            return state;
        }
    }
}

export const getGlobalState = (state: AppState) => <GlobalState>state.global;
