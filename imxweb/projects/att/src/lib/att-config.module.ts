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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { EuiCoreModule } from '@elemental-ui/core';
import { ClassloggerService, HELP_CONTEXTUAL, RouteGuardService } from 'qbm';
import { TilesModule } from 'qer';
import { AttestationFeatureGuardService } from './attestation-feature-guard.service';
import { AttestationHistoryWrapperComponent } from './attestation-history/attestation-history-wrapper.component';
import { MyAttestationCasesComponent } from './attestation-history/my-attestation-cases/my-attestation-cases.component';
import { ClaimDeviceComponent } from './claim-device/claim-device.component';
import { DashboardPluginComponent } from './dashboard-plugin/dashboard-plugin.component';
import { AttestationDecisionComponent } from './decision/attestation-decision.component';
import { AttestationDecisionModule } from './decision/attestation-decision.module';
import { AttestionAdminGuardService } from './guards/attestation-admin-guard.service';
import { HardwareGuardService } from './hardware-guard.service';
import { InitService } from './init.service';
import { PickCategoryComponent } from './pick-category/pick-category.component';
import { PolicyListComponent } from './policies/policy-list/policy-list.component';
import { PolicyGroupListComponent } from './policy-group/policy-group-list/policy-group-list.component';
import { AttestationRunsModule } from './runs/attestation-runs.module';
import { RunsComponent } from './runs/runs.component';
const routes: Routes = [
  {
    path: 'attestation/policies',
    component: PolicyListComponent,
    canActivate: [AttestationFeatureGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.AttestationPolicies,
    },
  },
  {
    path: 'attestation/runs',
    component: RunsComponent,
    canActivate: [AttestationFeatureGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.AttestationRuns,
    },
  },
  {
    path: 'attestation/history',
    component: AttestationHistoryWrapperComponent,
    canActivate: [AttestationFeatureGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.AttestationHistory,
    },
  },
  {
    path: 'attestation/decision',
    component: AttestationDecisionComponent,
    canActivate: [AttestationFeatureGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.PendingAttestations,
    },
  },
  {
    path: 'attestation/preselection',
    component: PickCategoryComponent,
    canActivate: [AttestationFeatureGuardService, AttestionAdminGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.AttestationPreselection,
    },
  },
  {
    path: 'claimdevice',
    component: ClaimDeviceComponent,
    canActivate: [HardwareGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.ClaimDevice,
    },
  },
  {
    path: 'attestation/policy-group',
    component: PolicyGroupListComponent,
    canActivate: [AttestationFeatureGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.AttestationPolicyCollections,
    },
    resolve: [RouteGuardService],
  },
  {
    path: 'attestation/myattestationcases',
    component: MyAttestationCasesComponent,
    canActivate: [AttestationFeatureGuardService],
    resolve: [RouteGuardService],
    data: {
      contextId: HELP_CONTEXTUAL.AttestationMyAttestationCases,
    },
  },
];

@NgModule({
  declarations: [DashboardPluginComponent],
  imports: [
    CommonModule,
    TilesModule,
    AttestationDecisionModule,
    RouterModule.forChild(routes),
    AttestationRunsModule,
    MatIconModule,
    MatListModule,
    TranslateModule,
    EuiCoreModule,
  ],
})
export class AttConfigModule {
  constructor(private readonly initializer: InitService, private readonly logger: ClassloggerService) {
    this.logger.info(this, '🔥 ATT loaded');
    this.initializer.onInit(routes);
    this.logger.info(this, '▶️ ATT initialized');
  }
}
