import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  imports: [MenubarModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit{
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home'
            },
            {
                label: 'Meetings',
                icon: 'pi pi-briefcase',
                routerLink: '/meetings'
            },
            {
                label: 'Calendar',
                icon: 'pi pi-calendar',
                routerLink: '/calendar'
            },
            {
                label: 'Charts',
                icon: 'pi pi-chart-bar',
                routerLink: '/chart'
            },
            {
                label: 'Map',
                icon: 'pi pi-map',
                routerLink: '/map'
            },
        ]
    }      
}