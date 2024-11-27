import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './pages/dashboard/main/main.component';
import { WorkComponent } from './pages/dashboard/work/work.component';
import { CalendarComponent } from './pages/dashboard/calendar/calendar.component';
import { SelectPlanComponent } from './pages/select-plan/select-plan.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path:'dashboard', component:DashboardComponent, canActivate: [authGuard], children:[
        {path:'', component: MainComponent},
        {path: 'work', component:WorkComponent},
        {path:'calendar', component:CalendarComponent}
    ]
    },
    {path: 'select-plan', component:SelectPlanComponent},
    {path: '**', component: NotFoundComponent}
];
