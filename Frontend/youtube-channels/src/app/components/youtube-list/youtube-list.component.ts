import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { SubscriptionDisposer } from 'src/app/core/disposer';
import { ApiService } from 'src/app/core/services/api.service';
import Swal from 'sweetalert2';
import { YoutubeCreateComponent } from '../youtube-create/youtube-create.component';

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.scss']
})
export class YoutubeListComponent extends SubscriptionDisposer implements OnInit {

  list: Array<any> = [];
  private _id: any;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { super(); }

  ngOnInit(): void {
    const checkbox: any = document.getElementById('checkbox');

    checkbox.addEventListener('change', () => {
      document.body.classList.toggle('dark');
    })

    this.getList();
  }

  getList(): void {
    this.apiService.getList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(resp => {
        if(resp){
          this.list = resp;
        }
      });
  }

  getSearchText(text: any): void {
    if(text){
      this.apiService.searchData(text)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(resp => {
          this.list = resp;
        });
    } else {
      this.getList();
    }
  }

  openDialog(_id: any) {
    this.dialog.open(YoutubeCreateComponent, {
      width: "500px",
      data: { _id },
    }).afterClosed().subscribe(data => {
      let payload = {
        name: data.payload.name || "",
        channel_name: data.payload.channel_name || "",
        channel_link: data.payload.channel_link || "",
        type: data.payload.type || "",
        total_videos: data.payload.total_videos || 0,
        img: [data.payload.img] || [],
        description: data.payload.description || ""
      }
      if(!data.isUpdate){        
        this.apiService.saveData(payload)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(resp => {
            this.getList();
          });
      }else {
        this.apiService.updateData(_id,payload)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(resp => {
          this.getList();
        });
      }
    });
  }

  delete(_id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteData(_id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(resp => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getList();
          });
      }
    })
  }
}
