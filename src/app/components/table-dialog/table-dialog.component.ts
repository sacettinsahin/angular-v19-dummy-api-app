import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'table-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.scss'
})
export class TablePopupComponent {
  @Input({required:true}) isShown!:boolean;
  @Input({required:true}) header!:string;
  @Input({required:true}) width!:string;

  @Output() hide = new EventEmitter<boolean>()

  closePopup():void{
    this.hide.emit(false);
  }
}
