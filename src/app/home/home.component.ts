import { Component, OnInit } from '@angular/core';
import { RequestService } from '../api/request.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;
    constructor(private requestService: RequestService) { }

    ngOnInit() {
        this.requestService.get();
    }
}
