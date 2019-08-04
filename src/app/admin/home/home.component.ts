import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { children } from './children.routes';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class AdminHomeComponent implements OnInit {

    basePath: string = '/admin/';
    actualPath: string = null;
    ipsum: boolean = false;
    links = children;
    constructor(private modalService: NgbModal, private router: Router) {
    }

    ngOnInit() {
        this.setActualPath();
    }

    handlePath(path: string): string {
        return this.basePath.concat(path);
    }

    setActualPath(){
        this.actualPath = this.router.url;
    }

    isActualPath(path: string)  {
        this.setActualPath();
        return (this.actualPath === this.basePath.concat(path));
    }

    open(content) {
        this.modalService.dismissAll();
        this.modalService.open(content, { centered: true, backdrop: 'static' }).result.then((result) => {
        }, (reason) => {
        });
    }

}
