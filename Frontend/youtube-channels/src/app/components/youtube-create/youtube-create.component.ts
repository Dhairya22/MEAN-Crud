import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { SubscriptionDisposer } from 'src/app/core/disposer';
import { ApiService } from 'src/app/core/services/api.service';
import { takeUntil } from "rxjs";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YoutubeListComponent } from '../youtube-list/youtube-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-youtube-create',
  templateUrl: './youtube-create.component.html',
  styleUrls: ['./youtube-create.component.scss']
})
export class YoutubeCreateComponent extends SubscriptionDisposer implements OnInit {

  channelForm!: FormGroup;
  btnTitle: String = "Create";
  isUpdate: boolean = false;
  selectedFiles = [];
  previews: string[] = [];

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { super(); }

  ngOnInit(): void {
    this.prepareForm();
    if (this.data._id) {
      this.isUpdate = true;
      this.getDetails(this.data._id);
    }
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.commonService.checkTimeStamp();
  }

  @HostListener('mouseover')
  mouseover() {
    this.commonService.checkTimeStamp();
  }

  @HostListener('mouseout')
  mouseout() {
    this.commonService.checkTimeStamp();
  }

  prepareForm(): void {
    this.channelForm = new FormGroup({
      name: new FormControl('', Validators.required),
      channel_name: new FormControl('', Validators.required),
      total_videos: new FormControl('', Validators.required),
      channel_link: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      img: new FormControl(''),
    })
  }

  getDetails(_id: any): void {
    this.apiService.getDetails(_id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(resp => {        
        this.btnTitle = "Update";
        if(resp){
          this.previews.push(resp.img[0]);
          this.channelForm.patchValue({
            name: resp.name,
            channel_name: resp.channel_name,
            total_videos: resp.total_videos,
            channel_link: resp.channel_link,
            description: resp.description,
            type: resp.type
          });          
          if(this.previews){
            this.channelForm.controls['img'].setValue(this.previews[0]);
          }
        }
      });
  }

  selectFiles(event: any): void {
    this.selectedFiles = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
}
