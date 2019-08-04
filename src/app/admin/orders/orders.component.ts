import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../api/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})

export class AdminOrdersComponent implements OnInit {

    @ViewChild('orderModal') orderModal: ElementRef;

    constructor(private modalService: NgbModal, private requestService: RequestService) { }

    ordersData = {
        total: 0,
        perPage: 0,
        page: 0,
        lastPage: 0,
        data: []
    }

    orderData: any;
    statusLabel = null;
    nextStatusLabel = null;

    actualPage = 1;
    status = [
        'Pendente', 'Aceito', 'Carregando', 'A caminho da entrega', 'Concluído'
    ]

    ngOnInit() {
        this.getOrdersApi();
    }

    async getOrdersApi() {
        const url = '/companies/orders/'.concat('3fbc4824-1f94-41e1-9c55-b20c407c394c');
        const parameters = {
            page: this.actualPage,
            limit: 20
        }
        const apiResponse = await this.requestService.default(url, true, 'GET', null, null, parameters);
        this.ordersData = apiResponse.result;
    }

    isActualPage(index: number): boolean {
        return (this.ordersData.page === (index + 1))
    }

    setPage(i: number) {
        this.actualPage = (i + 1);
        this.getOrdersApi();
    }

    async getOrderApi(id) {
        const data = await this.requestService.default('/order/'.concat(id));
        this.orderData = data.result;
        this.statusLabel = this.status[this.orderData.historic.length - 1];
        this.nextStatusLabel = this.status[this.orderData.status.id];
    }

    async openOrder(id: string) {
        this.getOrderApi(id);
        this.open(this.orderModal, { size: 'lg' });
    }

    async updateOrder(id: string, status = null) {
        const newStatus = (status == null) ? this.orderData.nextStatus.id : status;
        const url = '/order/'.concat(id).concat('/').concat(newStatus);
        await this.requestService.default(url, true, 'PATCH');
        this.getOrderApi(id);
    }

    open(content: any, param: any) {
        const modalParams = { ...param, centered: true, backdrop: 'static' }
        this.modalService.dismissAll();
        this.modalService.open(content, modalParams);
    }

    closeOrderModal() {
        this.modalService.dismissAll();
        this.getOrdersApi();
    }

    checkNextStatus() {
        return (this.orderData.nextStatus.text);
    }

}
