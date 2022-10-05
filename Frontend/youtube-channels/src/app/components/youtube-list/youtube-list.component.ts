import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.scss']
})
export class YoutubeListComponent implements OnInit {

  list: Array<any> = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.apiService.getList()
      // .pipe(takeUntil(this.destroyed$))
      .subscribe(resp => {
        if(resp){
          this.list = resp;
        }
      });
  }

}
