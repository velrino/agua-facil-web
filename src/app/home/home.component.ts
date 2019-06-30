import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    lat: number = 51.678418;
    lng: number = 7.809007;
    result = [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    ]

    form = {
        data: null,
        quantidade: 10,
        mangueiras: 1,
        total: 0,
        cliente: {
            name: null,
            email: null,
            address: {
                cep: null,
                street: null,
                number: null,
            },
            obs: null,
        }
    }
    formHelpers = {
        date: { min: null }
    }
    minDate: any;
    constructor(private modalService: NgbModal, calendar: NgbCalendar, private router: Router) {
        const today = calendar.getToday();
        this.formHelpers.date.min = today;
        this.form.data = today;
    }

    ngOnInit() {
        this.calcularTotal();
    }

    open(content, dismissAll = true) {
        this.modalService.dismissAll();
        this.modalService.open(content, { centered: true }).result.then((result) => {
        }, (reason) => {
        });
    }

    calcularTotal() {
        this.form.total = (this.form.quantidade * this.form.mangueiras * 20);
    }

    goToOrder(id) {
        this.modalService.dismissAll();
        this.router.navigate(['/order/'.concat(id)]);
    }
}
