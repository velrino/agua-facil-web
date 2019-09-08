import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../api/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admin-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})

export class AdminCompaniesComponent implements OnInit {

    @ViewChild('companyModal') companyModal: ElementRef;

    constructor(private modalService: NgbModal, private requestService: RequestService, private toastr: ToastrService) { }

    companiesData = {
        total: 0,
        perPage: 0,
        page: 0,
        lastPage: 0,
        data: []
    }

    companyData: any;
    statusLabel = null;
    nextStatusLabel = null;

    actualPage = 1;

    ngOnInit() {
        this.getCompaniesApi();
    }

    async getCompaniesApi() {
        const url = '/companies/';
        const parameters = {
            page: this.actualPage,
            limit: 20
        }
        const apiResponse = await this.requestService.default(url, true, 'GET', null, null, parameters);
        this.companiesData = apiResponse.result;
    }

    isActualPage(index: number): boolean {
        return (this.companiesData.page === (index + 1))
    }

    setPage(i: number) {
        this.actualPage = (i + 1);
        this.getCompaniesApi();
    }

    openModal(company) {
        this.companyData = company;
        this.open(this.companyModal, { size: 'lg' });
    }

    async updateCompany(user = false) {
        let tempCompanyData = this.companyData;
        const url = '/companies/'.concat(tempCompanyData.id);
        let message = "Empresa ".concat(tempCompanyData.name_fantasy).concat(" Atualizada");
        if (user) {
            tempCompanyData.user = true;
            message = "Usuário da empresa ".concat(tempCompanyData.name_fantasy).concat(" foi criado");
        }
        await this.requestService.default(url, true, 'PUT', tempCompanyData);
        await this.getCompaniesApi();
        this.toastr.success(message);
    }

    async mutateCompany(company, type = 'delete') {
        const url = '/companies/'.concat(company.id).concat('/').concat(type);
        await this.requestService.default(url, true, 'PATCH');
        await this.getCompaniesApi();
    }

    open(content: any, param: any) {
        const modalParams = { ...param, centered: true, backdrop: 'static' }
        this.modalService.dismissAll();
        this.modalService.open(content, modalParams);
    }

    closeCompanyModal() {
        this.modalService.dismissAll();
        this.getCompaniesApi();
    }

    handleUser(user) {
        return this.hasUser(user) ? "Não" : "Sim";
    }

    hasUser(user) {
        return (user == 0);
    }

    hasDeleted(company) {
        return ([99].includes(company.status_id));
    }
}
