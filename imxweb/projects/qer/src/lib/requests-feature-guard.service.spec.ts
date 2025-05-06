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

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService, RouteGuardService } from 'qbm';
import { QerApiService } from './qer-api-client.service';
import { RequestsFeatureGuardService } from './requests-feature-guard.service';
import { StartComponent } from './wport/start/start.component';
import { UserModelService } from './user/user-model.service';

describe('RequestsFeatureGuardService', () => {
  let service: RequestsFeatureGuardService;

  const userServiceStub = {
    getUserConfig: jasmine.createSpy('getUserConfig').and.returnValue(Promise.resolve([{}])),
  };

  const routeGuardServiceStub = {
    canActivate: jasmine.createSpy('canActivate').and.returnValue(Promise.resolve(true))
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: '', component: StartComponent }])],
      providers: [
        {
          provide: UserModelService,
          useValue: userServiceStub,
        },
        {
          provide: RouteGuardService,
          useValue: routeGuardServiceStub
        },
        {
          provide: AppConfigService,
          useValue: {
            Config: {
              Title: '',
              routeConfig: {
                start: 'dashboard',
                login: ''
              }
            }
          }
        }
      ],
    });
    service = TestBed.inject(RequestsFeatureGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
