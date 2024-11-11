import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IUser } from '../model/user.model'

@Injectable({
	providedIn: 'root'
})
export class ProductsApiService {
	constructor(private _http: HttpClient) {}

	getAllProducts(): Observable<IUser[]> {
		return this._http.get<IUser[]>('http://localhost:3000/users')
	}

	getProduct(id: number | string): Observable<IUser> {
		return this._http.get<IUser>(`http://localhost:3000/users/${id}`)
	}

	newProduct(product: IUser): Observable<IUser> {
		return this._http.post<IUser>(`http://localhost:3000/users`, product)
	}

	updateProduct(id: number | string, product: IUser): Observable<IUser> {
		return this._http.put<IUser>(`http://localhost:3000/users/${id}`, product)
	}

	deleteProduct(id: string): Observable<IUser> {
		return this._http.delete<IUser>(`http://localhost:3000/users/${id}`)
	}
}
