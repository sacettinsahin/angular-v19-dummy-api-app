import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

type Item = {
  label: string;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public items: Item[] = [
    {
      label: 'Home',
      link: '/home',
    },
    {
      label: 'Products',
      link: '/products',
    },
    {
      label: 'Categories',
      link: '/categories',
    },
    {
      label: 'Users',
      link: '/users',
    },
  ];
}
