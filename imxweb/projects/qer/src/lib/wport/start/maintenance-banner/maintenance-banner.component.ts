import { Component, OnInit } from '@angular/core';
import { AppConfigService, AuthenticationService } from 'qbm';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';

export interface MaintenanceElement {
  message: string;
}

let maintenanceText: MaintenanceElement = {
  message:'On Monday March 15th ( 15.00 - 17.00 CET ) the ITShop will be unavailable for scheduled maintenance.',
}

@Component({
  selector: 'imx-maintenance-banner',
  templateUrl: './maintenance-banner.component.html',
  styleUrls: ['./maintenance-banner.component.scss']
})

export class MaintenanceBannerComponent {
  isShow = true;
  bannerText = maintenanceText;

  closeBanner() {
    this.isShow = false;
  }
  constructor( private readonly config: AppConfigService ) {  }

  public async ngOnInit(): Promise<void> {
    //this.showBannerText();
  }

  public async showBannerText(): Promise<MaintenanceElement> {
    const data = await this.config.apiClient.processRequest(this.getMaintenanceFeatureData());
    maintenanceText = data;
    this.bannerText = maintenanceText;
    return data;
   }
  
   private getMaintenanceFeatureData(): MethodDescriptor<MaintenanceElement> {
    const parameters = [];
    return {
      path: `/portal/SupportPageInfo`,
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