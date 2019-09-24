import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { default as estadosData } from '../../helpers/data/estados';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../api/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  registerForm: FormGroup;
  states: string[] = [];

  constructor(
    private modalService: NgbModal,
    calendar: NgbCalendar,
    private router: Router,
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    const today = calendar.getToday();
    this.formHelpers.date.min = today;
    this.form.data = today;
    this.getEstado();
  }



  getEstado() {
    for (let index in estadosData) {
      const element = estadosData[index].cidades;
      this.states.push(...element);
    }
  }

  public address: any;
  stateSelected = null;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  goBusca() {
    const { address } = this;
    this.router.navigate(['/search'], { queryParams: { address } });
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
    this.registerForm = this.formBuilder.group({
      person: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [
        Validators.required,
        Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/),]]
    });
  }

  get formRegister() { return this.registerForm.controls; }

  checkIncludesInvalid(input) {
    const errors = {
      document: 'Informe o CNPJ corretamente',
      email: 'Informe o e-mail corretamente',
      name: 'Informe o nome da empresa',
      person: 'Informe o nome do responsável',
      phone: 'Informe o número de telefone',
    }
    return errors[input];
  }

  async submitCompany() {
    const { controls } = this.registerForm;
    if (this.registerForm.invalid) {
      const invalids = Object.keys(controls).filter(index => controls[index].status == "INVALID")
      if (invalids.length) {
        const message = this.checkIncludesInvalid(invalids[0]);
        this.toastr.error(message);
      }
      return
    } else {
      const data = {
        document: controls.document.value,
        email: controls.email.value,
        name_fantasy: controls.name.value,
        phone: controls.phone.value,
        person: controls.person.value,
        name_social: controls.name.value
      }
      const apiResponse = await this.requestService.default('/companies', true, 'post', data);
      if (apiResponse.error) {
        this.toastr.error('Empresa não foi criada');
      } else {
        this.toastr.success('Aguarde o nosso retorno no seu e-mail');
      }
    }
  }

  open(content, dismissAll = true) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true, backdrop: 'static' }).result.then((result) => {
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

  closeModal() {
    this.modalService.dismissAll();
  }
}
