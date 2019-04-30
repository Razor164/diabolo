import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as libPhoneNumber from 'libphonenumber-js';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { E164Number } from 'libphonenumber-js';
import { errFade } from '../../core/animations/err.animation';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { getGlobalState } from '../../store/global/global.reducer';
import { map } from 'rxjs/operators';
import { CountryCallingCode } from 'libphonenumber-js';
import { NationalNumber } from 'libphonenumber-js';

@Component({
    selector: 'diabolo-phone-picker',
    templateUrl: './phone-picker.component.html',
    styleUrls: ['./phone-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhonePickerComponent),
            multi: true,
        },
    ],
    animations: [errFade],
})
export class PhonePickerComponent implements ControlValueAccessor {
    form: FormGroup;
    codes$: Observable<any>;
    @Output() onChange: EventEmitter<E164Number> = new EventEmitter();

    private _initial: { code: CountryCallingCode, phone: NationalNumber };

    constructor(
        private store: Store<AppState>,
        private fb: FormBuilder,
    ) {
        this.codes$ = this.store.pipe(
            select(getGlobalState),
            map(state => state.callingCodes),
        );
        this.initForm();
    }

    getPhone(code: string, phone: string): E164Number {
        const phoneNumber = libPhoneNumber.parsePhoneNumberFromString(`+${code}${phone}`);
        if (phoneNumber && phoneNumber.isValid()) {
            return phoneNumber.number;
        } else return '';
    }

    parsePhone(phone: string): any {
        const phoneNumber = libPhoneNumber.parsePhoneNumberFromString(phone);
        if (phoneNumber && phoneNumber.isValid()) {
            this._initial = {
                code: phoneNumber.countryCallingCode,
                phone: phoneNumber.nationalNumber,
            };
            this.initForm();
        }
    }

    call(): void {
        if (this.form.invalid) {
            return;
        }
        const formValue = this.form.value;
        const query = this.getPhone(formValue.phoneCode, formValue.phoneNumber);
        window.open(`tel:${query}`, '_self');
        this.propagateChange(query);
        this.onChange.emit(query);
    }

    writeValue(value: any): void {
        if (!value) {
            return;
        }
        this.parsePhone(value);
    }

    propagateChange: (value: any) => void = () => {
    }

    _onTouched = () => {
    }

    registerOnChange(fn: (value: any) => void): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    initForm(): void {
        this.form = this.fb.group({
            phoneCode: [this._initial ? this._initial.code : ''],
            phoneNumber: [this._initial ? this._initial.phone : ''],
        }, {
            validators: (formGroup: FormGroup) => {
                return this.phoneMatcher(formGroup);
            },
        });
    }

    phoneMatcher(formGroup: FormGroup): { [key: string]: boolean } {
        const code = formGroup.get('phoneCode');
        const phone = formGroup.get('phoneNumber');
        if (!code || !phone) return null;
        return this.getPhone(code.value, phone.value) ? null : {invalid: true};
    }
}
