import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RequestService } from '../api/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

    @ViewChild('orderErrorModal') orderErrorModal: ElementRef;

    form = {
        company_place_id: '1fffe522-e46f-4366-9cb9-bb4807b58b59',
        client_name: null,
        client_email: null,
        client_address: null,
        client_phone: null,
        client_number: null,
        client_cep: null,
        quantity: 1,
        meters: 1,
        scheduling: false,
        date: null,
        obs: null,
        historic: []
    }
    order = {
        id: null,
        form: null,
    }

    status = [
        'Pendente', 'Aceito', 'Carregando', 'A caminho da entrega', 'Concluído', 'Cancelado', 'Expirado'
    ]

    statusLabel = null;

    constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private requestService: RequestService) {
        this.getOrder();
    }

    ngOnInit() { }

    getOrder() {
        this.route.paramMap.subscribe(queryParams => {
            this.defineOrder(queryParams.get("orderId"));
        })
    }

    defineOrder(id) {
        this.order.id = id;
        this.order.form = id;
        this.getOrderApi()
    }

    async getOrderApi() {
        const data = await this.requestService.default('/order/'.concat(this.order.id));

        if (data.error) {
            this.order.id = null;
            this.open(this.orderErrorModal);
        } else if (!data.error) {
            this.form = data.result;
            this.statusLabel = this.status[this.form.historic.length - 1];
        }
    }

    haveOrder() {
        return (this.order.id != null);
    }

    goToOrder() {
        if (this.order.form != null) {
            this.router.navigate(['/order/'.concat(this.order.form)]);
        }
    }

    open(content: any, dismissAll = true) {
        this.modalService.dismissAll();
        this.modalService.open(content, { centered: true, backdrop: 'static' }).result.then((result) => {
        }, (reason) => {
        });
    }
}
