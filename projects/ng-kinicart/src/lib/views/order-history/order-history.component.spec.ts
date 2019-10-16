import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { InlineModalComponent } from '../inline-modal/inline-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderHistoryComponent', () => {
    let component: OrderHistoryComponent;
    let fixture: ComponentFixture<OrderHistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderHistoryComponent,
            OrderDetailsComponent,
            InlineModalComponent],
            imports: [
                MatDatepickerModule,
                MatPaginatorModule,
                NoopAnimationsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
