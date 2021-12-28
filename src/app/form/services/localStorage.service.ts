import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  public getData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
