import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  authService = inject(AuthService)
  ngOnInit(): void {
    this.authService.userInfo().subscribe(
      res=> console.log(res)
    )
  }
}
