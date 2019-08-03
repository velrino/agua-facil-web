import { AdminOrdersComponent } from '../orders/orders.component';
import { AdminPlacesComponent } from '../places/places.component';

const children = [
    { path: 'orders', component: AdminOrdersComponent, data: { name: 'Pedidos' } },
    { path: 'places', component: AdminPlacesComponent, data: { name: 'Estabelecimentos' } },
]

export { children };