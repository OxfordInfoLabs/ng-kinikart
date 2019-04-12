import { Component, Input, OnInit } from '@angular/core';
import { KinibindModel, KinibindRequestService } from "ng-kinibind";
import { Subject } from "rxjs/internal/Subject";

@Component({
    selector: 'kc-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

    @Input() authService;

    public security: KinibindModel = new KinibindModel({});
    public twoFactorConfig: KinibindModel = new KinibindModel({});
    public reloadTwoFactor: Subject<boolean> = new Subject();
    public isLoading = true;

    constructor(private kbRequest: KinibindRequestService) {
    }

    ngOnInit() {

    }

    public resetAccountPassword() {
        const message = 'We are going to reset the account password to a temporary one and email the registered ' +
            'email address. Are you sure you wish to proceed?';
        if (window.confirm(message)) {
            this.authService.resetAccountPassword();
        }
    }

    public disable2FA() {
        const message = 'Are you sure you would like to turn off Two Factor Authentication?';
        if (window.confirm(message)) {
            this.kbRequest.makeGetRequest('/internal/account/disableGoogle2FA')
                .toPromise()
                .then(() => {
                    this.reloadTwoFactor.next(true);
                });
        }
    }


}
