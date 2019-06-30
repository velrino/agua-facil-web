import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

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
    order = {
        id: null,
        form: null,
    }

    status = [
        'Pendente', 'Aceito', 'Carregando', 'A caminho da entrega', 'Concluído', 'Cancelado', 'Expirado'
    ]
    
    historic = [
        {
            status: 3,
            date: '22/06/2019 - 21:34',
            obs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper"
        },
        {
            status: 2,
            date: '22/06/2019 - 18:17',
            obs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper"
        },
        {
            status: 1,
            date: '21/06/2019 - 21:32',
            obs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper"
        },
        {
            status: 0,
            date: '21/06/2019 - 08:15',
            obs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper"
        },
    ]
    constructor(private route: ActivatedRoute, private router: Router) {
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
    }
    haveOrder() {
        return (this.order.id != null);
    }

    goToOrder() {
        if(this.order.form != null) {
            this.router.navigate(['/order/'.concat(this.order.form)]);
        }
    }
}
