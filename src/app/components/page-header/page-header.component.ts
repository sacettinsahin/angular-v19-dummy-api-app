import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'page-header',
  imports: [ButtonModule, DialogModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  header = input.required<string>();
  page = input.required<string>();
  btnClick = output<Event>();
  isShown = signal<boolean>(false);

  clickButton($event:Event){
    this.isShown.set(!this.isShown());
    this.btnClick.emit($event);
  }
}
