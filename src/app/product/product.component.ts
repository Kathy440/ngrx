import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../form/models/product';
import { Store } from '@ngrx/store';
import { AppState } from '../form/states/app.state';
import { LocalStorageService } from '../form/services/localStorage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private store: Store<AppState>, private localStorageService: LocalStorageService) {
    this.products = this.store.select((state) => state.product);
  }

  addProduct(name, price) {
    this.store.dispatch({
      type: 'ADD_PRODUCT',
      payload: <Product>{
        name: name,
        price: price,
      },
    });
    //this.localStorageService.setData('profilFormData', this.payload.value);
  }

  ngOnInit(): void {
    console.log(this.products);
  }
}
