import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Inject } from '@angular/core';

import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { AppConfigService, AuthenticationService } from 'qbm';
import { SupportModule } from '../support.module';
import { CommonModule } from "@angular/common";

export interface ReleaseInterface {
  title: string;
  url: string;
  release_name: string;
  date: string;
}

const ReleasesData: ReleaseInterface[] = [
  {title: '', url: '', release_name: '', date: ''},
];


@Component({
  selector: 'ccc-popup-support-window',
  templateUrl: './popup-support-window.component.html',
  styleUrls: ['./popup-support-window.component.scss'],
})

export class PopupSupportWindowComponent implements OnInit {
  _ReleasesData = ReleasesData;
  filtersLoaded: Promise<boolean>;

  constructor(
    private dialogRef: MatDialogRef<PopupSupportWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly config: AppConfigService,
    private readonly authentication: AuthenticationService   
  ) { }

  ngOnInit(): void {
    this.authentication.update();
    this.getNewsAPI();
  }
  

  closeWindow() {
    localStorage.setItem('newsLast', this.data.newsDBdate);
    this.dialogRef.close();
  }

  public async getNewsAPI(): Promise<ReleaseInterface> {
    const data: any = await this.config.apiClient.processRequest(this.getNews());
    this._ReleasesData = data;
    this.filtersLoaded = Promise.resolve(true);
    
    return data;
   }

  private getNews(): MethodDescriptor<ReleaseInterface> {
    const parameters = [];
    return {
      path: `/portal/GetNews`,
      parameters,
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get(),
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json',
    };
  }

}