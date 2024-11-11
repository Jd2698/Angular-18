import { NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
	ReactiveFormsModule,
	// FormsModule,
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms'
import { IUser } from '../model/user.model'
import { ProductsApiService } from '../services/products-api.service'

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	successAlert?: boolean = false
	userForm!: FormGroup

	private _apiService = inject(ProductsApiService)

	constructor(private _formBuilder: FormBuilder) {
		this.userForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', Validators.required]
		})
	}

	onSubmit() {
		const newUser: IUser = this.userForm.value
		this._apiService.newProduct(newUser).subscribe({
			next: res => {
				this.successAlert = true
				this.userForm.reset()
			},
			error: (error: any) => {
				console.log('error al crear usuario: ', error)
			}
		})
	}

	hasError(field: string, errorType: string) {
		return (
			this.userForm.get(field)?.hasError(errorType) &&
			this.userForm.get(field)?.touched
		)
	}
}
