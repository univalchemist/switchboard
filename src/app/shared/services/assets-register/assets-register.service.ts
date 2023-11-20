import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env/env.service';
import { AssetService } from 'src/app/routes/assets/services/asset.service';
import { Router } from '@angular/router';
import { RouterConst } from 'src/app/routes/router-const';

@Injectable({
  providedIn: 'root',
})
export class AssetsRegisterService {
  private readonly httpOptions = { };
  private readonly authEndpoint = '/auth/login';
  private readonly podsEndpoint = '/pods/';
  private token: string;
  constructor(
    private http: HttpClient,
    private envService: EnvService,
    private assetsService: AssetService,
    private router: Router,
  ) {}
  async getToken() {
    const res: any = await this.http.post(
      this.envService.backendUrl + this.authEndpoint,
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
      this.envService.backendUrl + this.podsEndpoint + podId,
      {
        ...this.httpOptions,
        headers: {
          'Authorization': this.token,
        }
      }
    ).toPromise();
  }
  async registerAsset() {
    this.assetsService.register().subscribe(
      (res: string) => {
        // todo
        console.log(res);
        const namespace = 'jayson.iam.ewc';
        const roleName = 'assetapprover';
        this.router.navigate([RouterConst.Enrol], {
          queryParams: {
            roleName,
            org: namespace,
            stayLoggedIn: true,
            assetDid: res,
          },
        });
      });
  }
}
