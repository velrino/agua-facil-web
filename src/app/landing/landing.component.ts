import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { default as estadosData } from '../../helpers/data/estados';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../api/request.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  states: string[] = [];

  constructor(private modalService: NgbModal, calendar: NgbCalendar, private router: Router, private requestService: RequestService) {
    const today = calendar.getToday();
    this.formHelpers.date.min = today;
    this.form.data = today;
    this.getEstado();
    this.requestService.default('/api/places/search');
  }



  getEstado() {
    for (let index in estadosData) {
      const element = estadosData[index].cidades;
      this.states.push(...element);
    }
  }

  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  selectedState(state: any) {
    console.log(state.item);
    this.goBusca();
  }

  goBusca() {
    this.router.navigate(['/search'], { queryParams: {} });
  }

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
