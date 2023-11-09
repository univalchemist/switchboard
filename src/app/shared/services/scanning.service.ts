/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private _res: BehaviorSubject<string>;

  constructor() {
    this._res = new BehaviorSubject<string>('');
  }

  get result() {
    return this._res.asObservable();
  }

  // adding timeout wil cause endless loading when this.hide() was called earlier then 100ms after this.show()
  scanResult(res: any) {
    console.log('[Scanned result]', res);
    if (typeof res === 'string') {
      this._res.next(res);
    }
  }
}
