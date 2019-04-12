import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { NgKinibindModule } from 'ng-kinibind';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        NgKinibindModule,
        RouterModule,
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        AuthComponent
    ],
    providers: [
    ]
})
export class NgKinicartModule {
}
