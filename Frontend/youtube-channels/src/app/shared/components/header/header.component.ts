import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() text = new EventEmitter();
  username: any;
  
  searchForm = new FormGroup({
    search: new FormControl('')
  })

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  getText(searchText: any): void {
    this.text.emit(searchText.target.value);
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
