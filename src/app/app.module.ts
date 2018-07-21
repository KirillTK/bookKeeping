import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from "angularfire2";
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {SystemModule} from "./system/system.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase,'bookKeeping'),
        AngularFirestoreModule,
        SystemModule
    ],
    providers: [UsersService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
