import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { KinicartModuleConfig } from '../../ng-kinicart.module';

describe('BaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        KinicartModuleConfig
    ]
  }));

  it('should be created', () => {
    const service: BaseService = TestBed.get(BaseService);
    expect(service).toBeTruthy();
  });
});
