import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../models/users.model';
import { UsersService } from '../../../services/users.service';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from "../../../components/page-header/page-header.component";

@Component({
  selector: 'app-users',
  imports: [SpinnerComponent, TableModule, PageHeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users = signal<User[]>([]);
  usersService = inject(UsersService);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.usersService.getUsers().subscribe(
      (res) => {
        this.users.set(res.users);
      },
      (err) => console.log(err),
      () => this.isLoading.set(false)
    );
  }
}
