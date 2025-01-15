import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('https://656b0e9cdac3630cf7279f4e.mockapi.io/products')
  }

  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>('https://656b0e9cdac3630cf7279f4e.mockapi.io/products', product);
  }

  updateProduct(product:Product, id:string):Observable<Product>{
    return this.http.put<Product>(`https://656b0e9cdac3630cf7279f4e.mockapi.io/products/${id}`, product);
  }

  deleteProduct(id:string):Observable<Product>{
    return this.http.delete<Product>((`https://656b0e9cdac3630cf7279f4e.mockapi.io/products/${id}`));
  }
  
}
