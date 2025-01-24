import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../../components/page-header/page-header.component";

@Component({
  selector: 'app-categories',
  imports: [PageHeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  togglePopup(): void {}

}
