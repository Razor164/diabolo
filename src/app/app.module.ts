import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { APP_EFFECTS, metaReducers, reducerProvider, REDUCERS_TOKEN } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        HttpClientModule,
        StoreModule.forRoot(REDUCERS_TOKEN, {metaReducers}),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
        }),
        EffectsModule.forRoot([
            ...APP_EFFECTS,
        ]),
    ],
    bootstrap: [AppComponent],
    providers: [
        reducerProvider,
    ],
})
export class AppModule {
}
