import { NgModule } from '@angular/core';
import { PhonePickerModule } from './phone-picker/phone-picker.module';

@NgModule({
    declarations: [],
    imports: [
        PhonePickerModule,
    ],
    exports: [
        PhonePickerModule,
    ],
})
export class SharedModule {
}
