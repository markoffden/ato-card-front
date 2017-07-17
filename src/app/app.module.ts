import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {routing} from './app.routing';
import {Globals} from './services/globals.service';
import {UserService} from './services/user.service';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';

import {UserListComponent} from './components/admin/users/user-list/user-list.component';
import {AddUserComponent} from './components/admin/users/add-user/add-user.component';
import { CardListComponent } from './components/admin/cards/card-list/card-list.component';
import { AddCardComponent } from './components/admin/cards/add-card/add-card.component';
import { OutletListComponent } from './components/admin/outlets/outlet-list/outlet-list.component';
import { AddOutletComponent } from './components/admin/outlets/add-outlet/add-outlet.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        NavbarComponent,
        HomeComponent,
        UserListComponent,
        AddUserComponent,
        CardListComponent,
        AddCardComponent,
        OutletListComponent,
        AddOutletComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing,
        NgxMyDatePickerModule
    ],
    providers: [Globals, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
