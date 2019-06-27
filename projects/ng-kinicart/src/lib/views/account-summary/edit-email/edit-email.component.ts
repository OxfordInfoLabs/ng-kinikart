import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    selector: 'kc-edit-email',
    templateUrl: './edit-email.component.html',
    styleUrls: ['./edit-email.component.sass']
})
export class EditEmailComponent extends BaseComponent implements OnInit {

    @Output('saved') saved: EventEmitter<any> = new EventEmitter();

    public newEmailAddress = '';
    public currentPassword = '';
    public saveError: string;
    public emailAvailable = true;

    public user: any;

    constructor(kcAuthService: AuthenticationService) {
        super(kcAuthService);
    }

    ngOnInit() {
        super.ngOnInit();
        return this.authService.getLoggedInUser().then(user => {
            this.user = user;
        });
    }

    public checkEmail() {
        this.authService.emailAvailable(this.newEmailAddress).then(res => {
            this.emailAvailable = res;
        });
    }

    public saveEmailAddress() {
        this.authService.validateUserPassword(this.user.emailAddress, this.currentPassword)
            .then(res => {
                if (res) {
                    this.saveError = '';
                    this.authService.changeUserEmailAddress(this.newEmailAddress, this.currentPassword)
                        .then(user => {
                            this.user = user;
                            this.saved.emit(user);
                        });
                } else {
                    this.saveError = 'Password incorrect. Email address has not been updated.';
                }
            });
    }

}
