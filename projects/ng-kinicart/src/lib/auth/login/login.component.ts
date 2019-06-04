import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'kc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    @Input() authenticationService: any;
    @Input() loginRoute: string;

    public email: string;
    public password: string;
    public loading = false;
    public twoFA = false;
    public twoFACode: string;
    public twoFAError = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
        if (!this.authenticationService) {
            alert('You must supply an authentication service to this component');
        }
    }

    public login() {
        if (this.email && this.password) {
            this.loading = true;
            this.authenticationService.login(this.email, this.password)
                .then((res: any) => {
                    this.loading = false;

                    if (res.step === '2FA') {
                        this.twoFA = true;
                    } else {
                        this.router.navigate([this.loginRoute || '/']);
                    }

                })
                .catch(err => {
                    this.loading = false;
                    console.log('** ERROR ** -> ', err);
                });
        }
    }

    public checkUsername() {
        this.authenticationService.doesUserExist(this.email).then(res => {
        });
    }

    public authenticate() {
        this.loading = true;
        if (this.twoFACode) {
            this.authenticationService.authenticateTwoFactor(this.twoFACode)
                .then(user => {
                    this.loading = false;
                    this.router.navigate([this.loginRoute || '/']);
                })
                .catch(error => {
                    this.twoFAError = true;
                    this.loading = false;
                });
        }
    }

}
