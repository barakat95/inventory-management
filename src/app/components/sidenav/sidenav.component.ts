import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface MenuItem {
  defaultIcon?: string;
  activeIcon?: string;
  label: string;
  path?: string;
  action?: string;
  expanded?: boolean;
  children?: MenuItem[];
  active?: boolean;
  hasActiveChild?: boolean;
}

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  isCollapsed = false;
}
