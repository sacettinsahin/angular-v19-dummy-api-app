import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../models/users.model';
import { UsersService } from '../../../services/users.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { TableModule, TablePageEvent } from 'primeng/table';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
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
    // BirthdatePipe,
    // GenderPipe,
    // PhonePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users:User[]=[];
  usersService = inject(UsersService);
  isLoading:boolean = false;

  selectedColumns:Column[] = [];
  cols:Column[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe(
      (res) => {
        this.users = res.users.map(item=>({
          ...item,
          modBirthDate: this.modifyResponse(item.birthDate, 'birthdate'),
          modPhone: this.modifyResponse(item.phone, 'phone'),
          modGender: this.modifyResponse(item.gender, 'gender')
        }));
      },
      (err) => console.log(err),
      () => this.isLoading = false
    );

    this.cols =[
      {field:"id", header:"ID", sortable:true, selected:true},
      {field:"firstName", header:"First Name", sortable:true, selected:true},
      {field:"lastName", header:"Last Name", sortable:true, selected:true},
      {field:"age", header:"Age", sortable:true, selected:true},
      {field:"modBirthDate", header:"Date of Birth", sortable:false, selected:true},
      {field:"modPhone", header:"Phone", sortable:false, selected:true},
      {field:"role", header:"Role", sortable:true, selected:true},
      {field:"email", header:"Email", sortable:false, selected:true},
      {field:"modGender", header:"Gender", sortable:true, selected:true},
    ];

    //select columns;
    this.selectedColumns = this.cols;
  }

  change($event:any):void{
    //console.log($event.itemValue)
    if(!$event.itemValue) return;
    $event.itemValue.selected = !$event.itemValue.selected;
  }

  updatePage($event: TablePageEvent):void{
    //$event: {"first": 0,"rows": 5}
  }

  showColumn(field:string): boolean {
    return this.selectedColumns.some(col => col.field === `${field}`);
  }

  filterGlobal(event: Event, dt: any):void{
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input?.value || '', 'contains');
  }

  modifyResponse(value:string, field:'birthdate' | 'phone' | 'gender'):string{
    if(!value) return '-';

    switch(field){
      case 'birthdate':
        const arr = value.split("-")
        const year = arr[0];
        const month = arr[1].padStart(2, '0');
        const day = arr[2].padStart(2, '0')
        return `${day}/${month}/${year}`;
      
      case 'phone':
        const countryCode = value.split(" ")[0];
        const secondPart = value.split(" ")[1];
        const code = countryCode.split("+")[1];
        return `+(${code}) ${secondPart}`

      case 'gender':
        return value.charAt(0).toUpperCase();
      
    }

  }
}
