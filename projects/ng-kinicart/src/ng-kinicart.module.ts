import { NgModule } from '@angular/core';
import { NgKinibindModule } from 'ng-kinibind';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { AccountSummaryComponent } from './lib/account-summary/account-summary.component';
import { EditEmailComponent } from './lib/account-summary/edit-email/edit-email.component';
import { TwoFactorComponent } from './lib/account-summary/two-factor/two-factor.component';
import { LoginComponent } from './lib/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AccountSummaryComponent,
        EditEmailComponent,
        TwoFactorComponent,
        LoginComponent
    ],
    imports: [
        NgKinibindModule,
        RouterModule,
        CommonModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AccountSummaryComponent,
        EditEmailComponent,
        TwoFactorComponent,
        LoginComponent
    ],
    providers: []
})
export class NgKinicartModule {
}
