import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Notes } from '../../types/notes';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
 
}
