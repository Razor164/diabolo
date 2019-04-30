import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICode } from '../models/country-code';

@Injectable({providedIn: 'root'})
export class ClientHttpService {
    constructor(
        private http: HttpClient,
    ) {
    }

    onLoadCallingCodes(): Observable<ICode[]> {
        const url = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes';
        return this.http.get<ICode[]>(url);
    }
}
