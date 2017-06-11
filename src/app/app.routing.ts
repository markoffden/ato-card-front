import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from "./components/home/home.component";
import {UserListComponent} from "./components/admin/users/user-list/user-list.component";
import {AddUserComponent} from "./components/admin/users/add-user/add-user.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'admin/users',
        component: UserListComponent
    },
    {
        path: 'admin/users/add-new',
        component: AddUserComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
