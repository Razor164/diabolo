import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePickerComponent } from './phone-picker.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PhonePickerComponent,
    ],
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        PhonePickerComponent,
    ],
})
export class PhonePickerModule {
}
