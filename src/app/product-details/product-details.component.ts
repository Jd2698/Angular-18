import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { ProductsApiService } from '../services/products-api.service'
import { IUser } from '../model/user.model'
import { NgIf } from '@angular/common'

@Component({
	selector: 'app-product-details',
	standalone: true,
	imports: [RouterModule, NgIf],
	templateUrl: './product-details.component.html',
	styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
	product!: IUser
	loading: boolean = true

	constructor(
		private _route: ActivatedRoute,
		private _apiServices: ProductsApiService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe({
			next: value => {
				this._apiServices.getProduct(value['id']).subscribe({
					next: (data: IUser) => {
						this.product = data
						this.loading = false
					},
					error: (error: any) => {
						this.loading = false
						console.log('Error al obtener product: ', error)
					}
				})
			}
		})
	}
}
