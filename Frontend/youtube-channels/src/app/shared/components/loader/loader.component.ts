import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loader: any;

  constructor(
    private apiService: ApiService
  ) {
    this.apiService.loader.subscribe(res => {
      this.loader = res;
    });
   }

  ngOnInit(): void {
  }

}
