import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgKinibindModule } from 'ng-kinibind';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineModalComponent } from './lib/views/inline-modal/inline-modal.component';
import { PaymentMethodsComponent } from './lib/views/payment-methods/payment-methods.component';
import { PaymentMethodComponent } from './lib/views/payment-methods/payment-method/payment-method.component';

@NgModule({
    declarations: [
        InlineModalComponent,
        PaymentMethodsComponent,
        PaymentMethodComponent
    ],
    imports: [
        NgKinibindModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        PaymentMethodsComponent
    ],
    providers: [
    ]
})
export class NgKinicartModule {

    static forRoot(conf?: KinicartModuleConfig): ModuleWithProviders {
        return {
            ngModule: NgKinicartModule,
            providers: [
                { provide: KinicartModuleConfig, useValue: conf || {} }
            ]
        };
    }
}

export class KinicartModuleConfig {
    guestHttpURL: string;
    accessHttpURL: string;
}
