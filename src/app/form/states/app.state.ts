import { Product } from '../models/product';

export interface AppState {
  readonly product: Product[];
}
