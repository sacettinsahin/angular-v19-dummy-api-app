import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../models/users.model';
import { UsersService } from '../../../services/users.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { TableModule } from 'primeng/table';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { BirthdatePipe } from '../../../pipes/birthdate.pipe';
import { GenderPipe } from '../../../pipes/gender.pipe';
import { PhonePipe } from '../../../pipes/phone.pipe';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type Column = {
  field:string;
  header:string;
  sortable:boolean;
  selected:boolean;
}

@Component({
  selector: 'app-users',
  imports: [
    SpinnerComponent,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    PageHeaderComponent,
    BirthdatePipe,
    GenderPipe,
    PhonePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users = signal<User[]>([]);
  usersService = inject(UsersService);
  isLoading = signal<boolean>(false);

  selectedColumns:Column[] = [];
  cols:Column[] = [];

  ngOnInit(): void {
    this.isLoading.set(true);
    this.usersService.getUsers().subscribe(
      (res) => {
        this.users.set(res.users);
      },
      (err) => console.log(err),
      () => this.isLoading.set(false)
    );
    this.cols =[
      {field:"id", header:"ID", sortable:true, selected:true},
      {field:"firstName", header:"First Name", sortable:true, selected:true},
      {field:"lastName", header:"Last Name", sortable:true, selected:true},
      {field:"age", header:"Age", sortable:true, selected:true},
      {field:"birthDate", header:"Date of Birth", sortable:false, selected:true},
      {field:"phone", header:"Phone", sortable:false, selected:true},
      {field:"role", header:"Role", sortable:true, selected:true},
      {field:"email", header:"Email", sortable:false, selected:true},
      {field:"gender", header:"Gender", sortable:true, selected:true},
    ];

    //select columns;
    this.selectedColumns = this.cols;
  }

  change($event:any){
    //console.log($event.itemValue)
    $event.itemValue.selected = !$event.itemValue.selected;
  }

  showColumn(field:string): boolean {
    return this.selectedColumns.some(col => col.field === `${field}`);
  }
}
