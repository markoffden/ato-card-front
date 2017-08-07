import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {routing} from './app.routing';
import {Globals} from './services/globals.service';
import {UserService} from './services/user.service';
import {CardService} from './services/card.service';

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
import {FormService} from "./services/form.service";
import {AuthService} from "./services/auth.service";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {ApiService} from "./services/api.service";
import {AuthGuard} from "./shared/guards/auth.guard";
import { UserListItemComponent } from './components/admin/users/user-list/user-list-item/user-list-item.component';
import {OutletService} from "./services/outlet.service";

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { OutletListItemComponent } from './components/admin/outlets/outlet-list/outlet-list-item/outlet-list-item.component';
import { CardListItemComponent } from './components/admin/cards/card-list/card-list-item/card-list-item.component';
import {AdminGuard} from "./shared/guards/admin.guard";
import {NoAuthGuard} from "./shared/guards/no-auth.guard";
import { EditUserComponent } from './components/admin/users/edit-user/edit-user.component';
import { EditCardComponent } from './components/admin/cards/edit-card/edit-card.component';
import { EditOutletComponent } from './components/admin/outlets/edit-outlet/edit-outlet.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SwitchUserRolePipe } from './shared/pipes/switch-user-role.pipe';
import { SwitchUserGenderPipe } from './shared/pipes/switch-user-gender.pipe';
import { SwitchUserActivatedPipe } from './shared/pipes/switch-user-activated.pipe';

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
        AddOutletComponent,
        SignUpComponent,
        SignInComponent,
        UserListItemComponent,
        OutletListItemComponent,
        CardListItemComponent,
        EditUserComponent,
        EditCardComponent,
        EditOutletComponent,
        UserProfileComponent,
        UserSettingsComponent,
        ForgotPasswordComponent,
        SwitchUserRolePipe,
        SwitchUserGenderPipe,
        SwitchUserActivatedPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing,
        NgxMyDatePickerModule,
        Ng2AutoCompleteModule
    ],
    providers: [
        Globals,
        ApiService,
        AuthService,
        AuthGuard,
        NoAuthGuard,
        AdminGuard,
        FormService,
        UserService,
        CardService,
        OutletService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
