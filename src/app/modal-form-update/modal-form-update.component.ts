import {
	Component,
	EventEmitter,
	inject,
	Output,
	TemplateRef,
	ViewChild
} from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { IUser } from '../model/user.model'
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ProductsApiService } from '../services/products-api.service'

@Component({
	selector: 'app-modal-form-update',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf, NgClass],
	templateUrl: './modal-form-update.component.html',
	styleUrl: './modal-form-update.component.css'
})
export class ModalFormUpdateComponent {
	@ViewChild('content', { static: false }) contentTemplate!: TemplateRef<any>
	@Output() resetTable = new EventEmitter<string>()
	@Output() setAlertStatus = new EventEmitter<string>()

	private _modalService = inject(NgbModal)
	private _apiService = inject(ProductsApiService)

	userForm!: FormGroup
	product!: IUser

	constructor(private _formBuilder: FormBuilder) {
		this.userForm = _formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required]]
		})
	}

	setFormValues() {
		this.userForm?.patchValue({
			name: this.product.name,
			email: this.product.email,
			phone: this.product.phone
		})
	}

	resetProductsTable() {
		this.resetTable.emit()
	}

	open(productItem?: IUser) {
		productItem ? (this.product = productItem) : ''
		this.setFormValues()

		this._modalService
			.open(this.contentTemplate, { ariaLabelledBy: 'modal-basic-title' })
			.result.then(
				result => {
					// console.log(`Closed with: ${result}`)
				},
				reason => {
					// console.log(`Dismissed`)
				}
			)
	}

	hasError(field: string, errorType: string): boolean | undefined {
		return this.userForm?.get(field)?.hasError(errorType)
	}

	onSubmit() {
		if (this.userForm.valid) {
			const confirmUpdate = confirm('Do you want to update this product?')
			if (!confirmUpdate) {
				this._modalService.dismissAll()
				return
			}

			this._apiService
				.updateProduct(this.product.id, this.userForm.value)
				.subscribe({
					next: (res: any) => {
						this.setAlertStatus.emit()
						this.resetProductsTable()
						this._modalService.dismissAll()
					},
					error: (error: any) => {
						console.log(error)
					}
				})
		}
	}
}
