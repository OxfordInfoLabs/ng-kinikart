import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { KinicartModuleConfig } from '../../ng-kinicart.module';
import { KinibindRequestService } from 'ng-kinibind';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends BaseService {

    public authUser: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private kbRequest: KinibindRequestService,
                @Optional() config: KinicartModuleConfig) {
        super(config);
    }

    public getLoggedInUser(): any {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/customer/account/user')).toPromise()
            .then(res => {
                if (res) {
                    this.setSessionUser(res);
                    return res;
                }
                return null;
            });
    }

    public login(username: string, password: string) {
        const request = this.constructHttpURL(`/guest/auth/login?emailAddress=${username}&password=${password}`);
        return this.kbRequest.makeGetRequest(request).toPromise().then((user: any) => {

            if (user.step === '2FA') {
                sessionStorage.setItem('pendingLoginSession', user.session);
                return user;
            } else {
                return this.setSessionUser(user);
            }
        });
    }

    public authenticateTwoFactor(code) {
        const url = this.constructHttpURL(`/guest/auth/twoFactor?code=${code}`);
        return this.kbRequest.makeGetRequest(url).toPromise()
            .then(user => {
                sessionStorage.removeItem('pendingLoginSession');
                return this.setSessionUser(user);
            });
    }

    public doesUserExist(username: string) {
        return Promise.resolve(true);
    }

    public emailAvailable(emailAddress) {
        return this.kbRequest.makeGetRequest(
            this.constructHttpURL(`/guest/auth/emailExists?emailAddress=${emailAddress}`)
        ).toPromise().then(res => {
            return !res;
        });
    }

    public validateUserPassword(emailAddress, password) {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/validatePassword'), {
            params: {
                emailAddress,
                password
            }
        }).toPromise();
    }

    public changeUserEmailAddress(newEmailAddress, password) {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/changeEmail'), {
            params: {
                newEmailAddress,
                password
            }
        }).toPromise();
    }

    public changeUserBackEmailAddress(newEmailAddress, password) {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/changeBackupEmail'), {
            params: {
                newEmailAddress,
                password
            }
        }).toPromise();
    }

    public changeUserMobile(newMobile, password) {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/changeMobile'), {
            params: {
                newMobile,
                password
            }
        }).toPromise();
    }

    public getGoogleAuthSettings() {
        return true;
    }

    public logout() {
        this.authUser.next(null);
        sessionStorage.clear();
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/logout')).toPromise();
    }

    public setSessionUser(user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.authUser.next(user);
        return user;
    }
}
