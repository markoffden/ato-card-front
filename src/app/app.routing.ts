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

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent, children: [
        { path: 'users', component: UserListComponent },
        { path: 'users/add-new', component: AddUserComponent },
        { path: 'cards', component: CardListComponent },
        { path: 'cards/add-new', component: AddCardComponent },
        { path: 'outlets', component: OutletListComponent },
        { path: 'outlets/add-new', component: AddOutletComponent }
    ]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
