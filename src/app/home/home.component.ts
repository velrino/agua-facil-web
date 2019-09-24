import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../api/request.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    @ViewChild('orderFinishModal') orderFinishModal: ElementRef;
    @ViewChild('orderFinishErrorModal') orderFinishErrorModal: ElementRef;

    lat: number = -23.550520;
    lng: number = -46.633308;
    result = []

    form = {
        company_place_id: '1fffe522-e46f-4366-9cb9-bb4807b58b59',
        client_name: null,
        client_email: null,
        client_address: null,
        client_phone: null,
        client_number: null,
        client_cep: null,
        client_state: null,
        quantity: 1,
        meters: 1,
        scheduling: false,
        date: null,
        obs: null,
        total: 0,
    }

    search = {
        address: null,
        distance: 1
    }

    order: any = null;

    formHelpers = {
        date: { min: null },
        dateForm: null,
        distance: [1, 3, 5, 10, 15, 20, 50, 100]
    }
    minDate: any;
    constructor(private modalService: NgbModal, calendar: NgbCalendar, private router: Router, private requestService: RequestService, private activatedRoute: ActivatedRoute) {
        const today = calendar.getToday();
        this.formHelpers.date.min = today;
        this.formHelpers.dateForm = today;
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            const address = params['address'];
            this.search.address = (address) ? address : null;
            this.getPlacesApi()
            this.calcularTotal();
          });
    }

    open(content: any, dismissAll = true) {
        this.modalService.dismissAll();
        this.modalService.open(content, { centered: true, backdrop: 'static' }).result.then((result) => {
        }, (reason) => {
        });
    }

    calcularTotal() {
        this.form.total = (this.form.quantity * this.form.meters * 20);
    }

    goToOrder() {
        this.modalService.dismissAll();
        this.router.navigate(['/order/'.concat(this.order.id)]);
    }

    async getCEP(): Promise<void> {
        const url = 'https://viacep.com.br/ws/'.concat(this.form.client_cep).concat('/json/unicode/');
        const data = await this.requestService.default(url, false);
        this.form.client_address = data.result.logradouro;
        this.form.client_state = data.result.localidade;
    }

    async createOrder(): Promise<void> {
        const { dateForm } = this.formHelpers;
        this.form.date = this.formatDate(dateForm);
        const data = await this.requestService.default('/order', true, 'post', this.form);

        if (data.error) {
            this.order = null
            this.open(this.orderFinishErrorModal);
        } else if (!data.error) {
            this.order = data.result;
            this.open(this.orderFinishModal);
        }
    }

    formatDate(date: any): string {
        return '' + date.day + '/' + date.month + '/' + date.year;
    }

    async getPlacesApi(): Promise<void> {
        const url = '/places/search';
        console.log(this.search);
        const data = await this.requestService.default(url, true, 'get', null, null, {
            ...this.search
        });
        this.result = data.result.data;
        if (this.result[0]) {
            this.lat = this.result[0].latitude;
            this.lng = this.result[0].longitude;
        }
    }

    checkScheduling(scheduling: number) {
        return (scheduling == 1) ? 'Sim' : 'Não';
    }

    methodPayments(payments) {
        const methodsPayments = {
            1: 'Crédito',
            2: 'Débito',
            3: 'Boleto',
        }
        let render = [];
        for (let index in payments) {
            render.push(methodsPayments[payments[index]])
        }
        return render.join(',');
    }
}
