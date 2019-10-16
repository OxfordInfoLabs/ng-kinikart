import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'DD/MM/YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'DD/MM/YYYY',
    },
};

@Component({
    selector: 'kc-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.sass'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class OrderHistoryComponent implements OnInit {

    public downloadURL: string;
    public startDate = new BehaviorSubject<string>('');
    public endDate = new BehaviorSubject<string>('');
    public orders: any[] = [{
        id: 321321321,
        status: 'Complete',
        buyerName: 'Mr J Bloggs',
        date: '14/10/19 09:30',
        subtotal: '3.50',
        taxes: '0.70',
        total: '4.20',
        paymentData: {
            AccountBalance: {
                amount: "4.20",
                paymentData: [],
                paymentReference: "",
                status: "Captured"
            }
        },
        currency: {
            htmlSymbol: '&pound;'
        }
    },{
        id: 654654654,
        status: 'Complete',
        buyerName: 'Mr J Bloggs',
        date: '15/10/19 09:30',
        subtotal: '10.00',
        taxes: '2.00',
        total: '12.00',
        paymentData: {
            AccountBalance: {
                amount: "12.00",
                paymentData: [],
                paymentReference: "",
                status: "Captured"
            }
        },
        currency: {
            htmlSymbol: '&pound;'
        }
    }];
    public searchText = new BehaviorSubject<string>('');
    public pageSize = new BehaviorSubject<number>(10);
    public page = new BehaviorSubject<number>(1);
    public ordersSize: number;
    public moment = moment;
    public allSelected = false;
    public selectionMade = false;
    public lodash = _;
    public selectedOrder: any;
    public viewOrderDetails = false;

    constructor() {
    }

    ngOnInit() {
    }

    public search(searchTerm: string) {
        this.searchText.next(searchTerm);
    }

    public updatePage(pageEvent) {
        const pageSize = this.pageSize.getValue();

        if (pageEvent.pageSize !== pageSize) {
            this.pageSize.next(pageEvent.pageSize);
        } else {
            this.page.next(pageEvent.pageIndex + 1);
        }
    }

    public toggleSelectAllOrders() {
        this.allSelected = !this.allSelected;
        this.selectionMade = this.allSelected;
        this.orders = this.lodash.map(this.orders, domain => {
            domain.selected = this.allSelected;
            return domain;
        });
    }

    public toggleOrderSelected(order) {
        order.selected = !order.selected;

        this.selectionMade = this.lodash.some(this.orders, 'selected');
    }

    public viewOrder(order) {
        this.selectedOrder = order;
        this.viewOrderDetails = true;
    }
}
