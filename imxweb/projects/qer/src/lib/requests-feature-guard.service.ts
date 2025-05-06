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
 * Copyright 2023 One Identity LLC.
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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserConfig } from 'imx-api-qer';
import { AppConfigService, RouteGuardService } from 'qbm';
import { UserModelService } from './user/user-model.service';

@Injectable({
  providedIn: 'root',
})
export class RequestsFeatureGuardService implements CanActivate {
  constructor(
    private readonly appConfig: AppConfigService,
    private readonly routeGuardService: RouteGuardService,
    private readonly router: Router,
    private readonly userService: UserModelService
  ) {}

  public async getUserConfig(): Promise<UserConfig> {
    return this.userService.getUserConfig();
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (await this.routeGuardService.canActivate(route, state)) {
      const userConfig = await this.getUserConfig();
      const featureEnabled = userConfig?.IsITShopEnabled;
      if (!featureEnabled) {
        this.router.navigate([this.appConfig.Config.routeConfig.start]);
      }
      return featureEnabled;
    }

    this.router.navigate([this.appConfig.Config.routeConfig.login]);
    return false; 
  }
}
