import { Routes } from '@angular/router'
import { ProductsComponent } from './products/products.component'
import { HomeComponent } from './home/home.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ModalFormUpdateComponent } from './modal-form-update/modal-form-update.component'

export const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'products', component: ProductsComponent },
	{ path: 'products/product-details/:id', component: ProductDetailsComponent },
	{ path: '**', redirectTo: 'home' }
]
