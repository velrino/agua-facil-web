import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../api/request.service';
import { ENUMS } from '../../../helpers/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admin-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss']
})

export class AdminPlacesComponent implements OnInit {

    @ViewChild('placeModal') placeModal: ElementRef;

    actualPage = 1;
    placeData: any = {};
    dropdownList = {
        payments: [],
        periods: [],
    };
    selectedItems = {
        payments: [],
        periods: [],
    };
    dropdownSettings = {};

    placesData = {
        total: 0,
        perPage: 0,
        page: 0,
        lastPage: 0,
        data: []
    }
    constructor(private modalService: NgbModal, private requestService: RequestService, private toastr: ToastrService) { }

    ngOnInit() {
        this.getPlacesApi();
    }

    async getPlacesApi() {
        const url = '/places/search/';
        const parameters = {
            page: this.actualPage,
            limit: 20
        }
        const apiResponse = await this.requestService.default(url, true, 'GET', null, {
            'Authorization': 'Bearer '.concat(ENUMS.Auth())
        }, parameters);
        this.placesData = apiResponse.result;
    }


    isActualPage(index: number): boolean {
        return (this.placesData.page === (index + 1))
    }


    open(content: any, param: any) {
        const modalParams = { ...param, centered: true, backdrop: 'static' }
        this.modalService.dismissAll();
        this.modalService.open(content, modalParams);
    }

    async openPlace(id: string = null) {
        const defaultPlaceData = {
            id: null,
            company_id: ENUMS.Auth('company_id'),
            status_id: 1,
            "scheduling": 1,
            "trucks": 0,
            "price": 0,
            "distance": 0,
            "address": "Avenida Paulista 1374, 01310-100, São Paulo",
            "data": {
                "meters": [],
                "period": [],
                "payment": []
            },
        }
        this.placeData = (id != null) ? await this.getPlaceApi(id) : defaultPlaceData;

        this.init();
        this.open(this.placeModal, { size: 'lg' });
    }

    async getPlaceApi(id) {
        const data = await this.requestService.default('/places/'.concat(id));
        return data.result;
    }

    async updatePlace(id: string, status = null) {
        //const newStatus = (status == null) ? this.placeData.nextStatus.id : status;
        //const url = '/places/'.concat(id).concat('/').concat();
        //await this.requestService.default(url, true, 'PATCH');
        //this.getOrderApi(id);
    }

    closeModal() {
        this.modalService.dismissAll();
        this.getPlacesApi();
    }

    init() {
        this.dropdownList.periods = ENUMS.periods;
        this.dropdownList.payments = ENUMS.payments;
        this.selectedItems.payments = ENUMS.payments.filter(item => this.placeData.data.payment.includes(item.id))
        this.selectedItems.periods = ENUMS.periods.filter(item => this.placeData.data.period.includes(item.id))
        this.dropdownSettings = ENUMS.multiselectDropdownSettings;
    }

    emptyValue(input) {
        return ![input].length;
    }

    async submit() {
        if (!this.selectedItems.payments.length) {
            this.toastr.error('Informe pelo menos 1 forma de pagamento');
            return;
        } else if (!this.selectedItems.periods.length) {
            this.toastr.error('Informe pelo menos 1 periodo');
            return;
        } else if (!this.placeData.address.length) {
            this.toastr.error('Informe um endereço');
            return;
        }

        this.placeData.data = {
            payment: this.selectedItems.payments.map(item => item.id),
            period: this.selectedItems.periods.map(item => item.id),
        }
        await this.callApi(this.placeData.id);
    }

    async callApi(id = null, isDelete = false) {
        let url = '/places';
        let method = 'POST';
        let message = 'Estabelecimento criado';

        if (id != null) {
            url = '/places/'.concat(id);
            method = 'PUT';
            message = 'Estabelecimento atualizado';
            this.placeData.data = JSON.stringify(this.placeData.data)
            if (isDelete) {
                method = 'DELETE';
                message = 'Estabelecimento deletado';
                this.placeData = {};
            }
        }
        await this.requestService.default(url, true, method, this.placeData);
        this.toastr.success(message);
        (method == 'POST') ? this.closeModal() : this.getPlacesApi();
    }

    havePlacesData() {
        return this.placesData.data.length > 0;
    }

    setPage(i: number) {
        this.actualPage = (i + 1);
        this.getPlacesApi();
    }
}
