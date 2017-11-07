import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from "./components/home/home.component";
import {UserListComponent} from "./components/admin/users/user-list/user-list.component";
import {AddUserComponent} from "./components/admin/users/add-user/add-user.component";
import {CardListComponent} from "./components/admin/cards/card-list/card-list.component";
import {AddCardComponent} from "./components/admin/cards/add-card/add-card.component";
import {OutletListComponent} from "./components/admin/outlets/outlet-list/outlet-list.component";
import {AddOutletComponent} from "./components/admin/outlets/add-outlet/add-outlet.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {AuthGuard} from './shared/guards/auth.guard';
import {NoAuthGuard} from "./shared/guards/no-auth.guard";
import {AdminGuard} from "./shared/guards/admin.guard";
import {EditUserComponent} from "./components/admin/users/edit-user/edit-user.component";
import {EditCardComponent} from "./components/admin/cards/edit-card/edit-card.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {EditOutletComponent} from "./components/admin/outlets/edit-outlet/edit-outlet.component";
import {GetCardComponent} from './components/get-card/get-card.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sign-in', component: SignInComponent, canActivate: [NoAuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NoAuthGuard] },
    { path: 'sign-up', component: SignUpComponent, canActivate: [NoAuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'user-settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
    { path: 'get-card', component: GetCardComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], children: [
        { path: 'users', component: UserListComponent },
        { path: 'users/add-new', component: AddUserComponent },
        { path: 'users/:id', component: EditUserComponent },
        { path: 'cards', component: CardListComponent },
        { path: 'cards/add-new', component: AddCardComponent },
        { path: 'cards/:id', component: EditCardComponent },
        { path: 'outlets', component: OutletListComponent },
        { path: 'outlets/add-new', component: AddOutletComponent },
        { path: 'outlets/:id', component: EditOutletComponent }
    ]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
