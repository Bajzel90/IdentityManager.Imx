/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2022 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EuiLoadingService } from '@elemental-ui/core';

import { UserConfig, ProjectConfig, QerProjectConfig } from 'imx-api-qer';
import { UserModelService } from '../../user/user-model.service';
import { PendingItemsType } from '../../user/pending-items-type.interface';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
import { AppConfigService, AuthenticationService, imx_SessionService, SystemInfoService } from 'qbm';
import { SystemInfo } from 'imx-api-qbm';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';
import { QerService } from '../../qer.service';

@Component({
  templateUrl: './start.component.html',
  selector: 'imx-start',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  public userConfig: UserConfig;
  public projectConfig: QerProjectConfig & ProjectConfig;
  public pendingItems: PendingItemsType;
  public systemInfo: SystemInfo;
  public viewReady: boolean;
  public userUid: string;
  dataSource: string[] = [];
  functionObjectsCount: number = 0;
  public BulkActionsCofigParamCount: number;

  constructor(
    public readonly router: Router,
    private readonly busyService: EuiLoadingService,
    private readonly userModelSvc: UserModelService,
    private readonly systemInfoService: SystemInfoService,
    private readonly sessionService: imx_SessionService,
    private readonly projectConfigurationService: ProjectConfigurationService,
    private readonly config: AppConfigService,
    private readonly authentication: AuthenticationService,
    private qerService: QerService
  ) {}

  public async ngOnInit(): Promise<void> {
    let overlayRef: OverlayRef;
    setTimeout(() => (overlayRef = this.busyService.show()));
    try {
      this.userConfig = await this.userModelSvc.getUserConfig();
      this.pendingItems = await this.userModelSvc.getPendingItems();
      this.projectConfig = await this.projectConfigurationService.getConfig();
      this.systemInfo = await this.systemInfoService.get();
      this.userUid = (await this.sessionService.getSessionState()).UserUid;
      this.viewReady = true;
      this.authentication.update();
      this.BulkActionsCofigParamCount = await this.countPropertiesInConfigurationParameters();
      await this.getAERoleforCsvImporter(); // Wait for data to be fetched

      this.functionObjectsCount = this.countObjectsWithFunctionKey(this.dataSource);
      console.log("Number of objects with 'Function' property:", this.functionObjectsCount);
    } finally {
      setTimeout(() => this.busyService.hide(overlayRef));
    }
    console.log(this.dataSource);
  }

  public ShowPasswordTile(): boolean {
    return this.userConfig.ShowPasswordTile;
  }

  public ShowPasswordMgmtTile(): boolean {
    return this.projectConfig.PasswordConfig.VI_MyData_MyPassword_Visibility && !!this.projectConfig.PasswordConfig.PasswordMgmtUrl;
  }

  public GoToMyPassword(): void {
    this.router.navigate(['profile', 'profile-password-questions']);
  }

  public GoToPasswordMgmtWeb(): void {
    this.router.navigate(['/externalRedirect', { externalUrl: this.projectConfig.PasswordConfig.PasswordMgmtUrl }]);
  }

  public GoToShoppingCart(): void {
    this.router.navigate(['shoppingcart']);
  }

  public GoToProductSelection(): void {
    this.router.navigate(['productselection']);
  }

  public GoToItshopApprovals(): void {
    this.router.navigate(['itshop', 'approvals']);
  }

  public GoToItShopApprovalInquiries(): void {
    this.router.navigate(['itshop', 'answerquestions']);
  }

  public GoToMyProcesses(): void {
    this.router.navigate(['/QBM_MyProcesses'], {});
  }

  public ShowQpmIntegration(): boolean {
    return !!this.projectConfig.PasswordConfig.QpmBaseUrl;
  }

  public GoToQpm(): void {
    this.router.navigate(['qpmintegration'], {});
  }

  public GoToDashboardEmployeesByRiskIndex(): void {
    // TODO (ADO 207303) this.router.navigate(['/VI_Start_Governance'], { Part: 'Risk' });
  }

  public GoToDashboardOrganization(): void {
    // TODO (ADO 207303) this.router.navigate(['/VI_Start_Governance'], { Part: 'Organization' });
  }

  public GoToDashboardRequests(): void {
    // TODO (ADO 207303) this.router.navigate(['/VI_Start_Governance'], { Part: 'ITShop' });
  }

  public GetCountProductsinShoppingCart(): number {
    return this.pendingItems.CountProductsInShoppingCart;
  }

  public GetCountInRequestHistory(): number {
    return this.userConfig.CountPendingRequests;
  }

  public GetCountPendingRequests(): number {
    return this.pendingItems.OpenPWO;
  }

  public GetCountRequestInquiries(): number {
    return this.pendingItems.OpenInquiries;
  }

  public GetCountNewProcesses(): number {
    return 0; // hide for now
    // return this.pendingItems.NewProcesses;
  }

  public ShowPasswordLink(): boolean {
    // TODO (TFS 805999) not(isnullorempty(getconfig('VI_Common_PasswordWebLink')))
    return true;
  }

  public ShowNewRequestLink(): boolean {
    // Starting a new request is only allowed when the session has an identity and the ITShop(Requests) feature is enabled
    return this.userConfig?.IsITShopEnabled && this.userUid && this.systemInfo.PreProps.includes('ITSHOP');
  }

  public GoToCSVsync(): void {
    this.router.navigate(['/csvsync-component']);
  }

  private countObjectsWithFunctionKey(data: any): number {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return 0; // Return 0 if data is undefined, null, or an empty array
    }

    if (Array.isArray(data)) {
      // If data is an array, count objects with "Function" or "function" keys
      return data.reduce((count, item) => {
        return count + (item.hasOwnProperty("Function") || item.hasOwnProperty("function") ? 1 : 0);
      }, 0);
    } else if (typeof data === 'object') {
      // If data is an object, check if it has "Function" or "function" keys
      return (data.hasOwnProperty("Function") || data.hasOwnProperty("function")) ? 1 : 0;
    }

    return 0; // Return 0 for other data types
  }



  public async getAERoleforCsvImporter(): Promise<void> {
    const CsvImporter = await this.config.apiClient.processRequest<string[]>(this.getWhoForCSV());
    console.log(CsvImporter);
    this.dataSource = CsvImporter;
   }

   private getWhoForCSV(): MethodDescriptor<void> {
    const parameters = [];
    return {
      path: `/portal/BulkActionsFunctionsForUser`,
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

  public async ConfigurationParameters(): Promise<object> {
    const ConfigurationParameters = await this.config.apiClient.processRequest(this.getConfigCsv());
    console.log(ConfigurationParameters);
    return ConfigurationParameters;
   }

   public async countPropertiesInConfigurationParameters(): Promise<number> {
    const configurationParameters = await this.ConfigurationParameters();
    return Object.keys(configurationParameters).length;
  }


   private getConfigCsv(): MethodDescriptor<object> {
    const parameters = [];
    return {
      path: `/portal/ConfigCsv`,
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
