import { Injectable } from '@angular/core';
import { KinicartModuleConfig } from '../../ng-kinicart.module';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(public config: KinicartModuleConfig) {
    }

    public constructHttpURL(url) {
        if (this.config) {
            return this.config.httpURL + url;
        }
        return url;
    }
}
