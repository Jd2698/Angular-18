import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ProductsApiService } from '../services/products-api.service'
import { IUser } from '../model/user.model'
import { RouterLink } from '@angular/router'
import { ModalFormUpdateComponent } from '../modal-form-update/modal-form-update.component'

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [NgFor, RouterLink, ModalFormUpdateComponent, NgIf],
	templateUrl: './products.component.html',
	styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
	productList?: IUser[]
	successAlert: boolean = false

	constructor(private _apiService: ProductsApiService) {}

	ngOnInit(): void {
		this.getProducts()
	}

	setAlertStatus() {
		this.successAlert = false
		setTimeout(() => {
			this.successAlert = true
		}, 100)
	}

	getProducts(): void {
		this._apiService.getAllProducts().subscribe({
			next: res => {
				this.productList = res
			},
			error: (error: any) => {
				console.log('Error en la consulta: ', error)
			}
		})
	}

	deleteUser(item: IUser, id: string) {
		const confirmDelete = confirm(`Do you want to delete to ${item.name}?`)
		if (!confirmDelete) {
			return
		}

		this._apiService.deleteProduct(id).subscribe({
			next: res => {
				this.getProducts()
			},
			error: (error: any) => {
				console.log('Error en la consulta delete: ', error)
			}
		})
	}
}
