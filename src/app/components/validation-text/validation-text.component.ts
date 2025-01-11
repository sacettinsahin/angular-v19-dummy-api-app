import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-validation-text',
  imports: [TitleCasePipe],
  templateUrl: './validation-text.component.html',
  styleUrl: './validation-text.component.scss'
})
export class ValidationTextComponent {
  @Input({required:true}) form!:FormGroup
  @Input({required:true}) field!:string;

}
