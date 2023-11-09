import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsRegisterService {
  private readonly httpOptions = { withCredentials: true };
  private readonly authEndpoint = '/auth/login';
  private readonly podsEndpoint = '/pods/';
  private token: string;
  constructor(
    private http: HttpClient,
    private envService: EnvService
  ) {}
  async getToken() {
    const res: any = await this.http.post(
      // this.envService.backendUrl + this.authEndpoint,
      "/api" + this.authEndpoint,
      {
        name: this.envService.authUsername,
        password: this.envService.authPassword
      },
      this.httpOptions
    ).toPromise();
    this.token = res.accessToken;
  }
  async getAssetDetail(podId: string) {
    await this.getToken();
    return this.http.get(
      // this.envService.backendUrl + this.podsEndpoint + podId,
      "/api" + this.podsEndpoint + podId,
      {
        ...this.httpOptions,
        headers: {
          'Authorization': this.token,
        }
      }
    ).toPromise();
  }
}
