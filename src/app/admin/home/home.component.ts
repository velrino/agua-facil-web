import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { children } from './children.routes';
import { StorageService } from '../../api/storage/storage.service';
import { ENUMS } from '../../../helpers/enums';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class AdminHomeComponent implements OnInit {

    basePath: string = '/admin/';
    actualPath: string = null;
    ipsum: boolean = false;
    links: any;
    constructor(private modalService: NgbModal, private router: Router) {
        this.makeLinks();
    }

    ngOnInit() {
        this.setActualPath();
    }

    handlePath(path: string): string {
        return this.basePath.concat(path);
    }

    setActualPath() {
        this.actualPath = this.router.url;
    }

    isActualPath(path: string) {
        this.setActualPath();
        return (this.actualPath === this.basePath.concat(path));
    }

    open(content) {
        this.modalService.dismissAll();
        this.modalService.open(content, { centered: true, backdrop: 'static' }).result.then((result) => {
        }, (reason) => {
        });
    }

    logout() {
        StorageService.delete('auth');
        this.router.navigate(['/login']);
    }

    checkIsAdminMaster() {
        const hierarchy = ENUMS.Auth('hierarchy');
        return [99].includes(hierarchy)
    }

    makeLinks() {
        this.links = children.filter(item => {
            return (item.path == 'companies' && !this.checkIsAdminMaster()) ? null : item;
        });
    }
}
