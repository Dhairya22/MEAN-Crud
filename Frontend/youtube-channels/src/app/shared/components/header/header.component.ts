import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() text = new EventEmitter();
  
  searchForm = new FormGroup({
    search: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  getText(searchText: any): void {
    this.text.emit(searchText.target.value);
  }
}
