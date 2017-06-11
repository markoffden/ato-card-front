import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';

import {routing} from './app.routing';
import {UserListComponent} from './components/admin/users/user-list/user-list.component';
import {Globals} from './services/globals.service';
import {UserService} from './services/user.service';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        NavbarComponent,
        HomeComponent,
        UserListComponent,
        AddUserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [Globals, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
