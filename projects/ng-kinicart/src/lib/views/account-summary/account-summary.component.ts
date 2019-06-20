import { Component, Input, OnInit } from '@angular/core';
import { KinibindRequestService } from 'ng-kinibind';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'kc-account-summary',
    templateUrl: './account-summary.component.html',
    styleUrls: ['./account-summary.component.sass']
})
export class AccountSummaryComponent implements OnInit {

    @Input() authenticationService: any;

    public security: any;
    public twoFactorConfig: any;
    public reloadTwoFactor: Subject<boolean> = new Subject();
    public isLoading = true;

    public editEmail = false;
    public editMobile = false;
    public editBackup = false;
    public enableTwoFa = false;

    public authService;

    constructor(private kbRequest: KinibindRequestService,
                private kcAuthService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService = this.authenticationService ? this.authenticationService : this.kcAuthService;
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
