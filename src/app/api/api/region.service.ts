import {Inject, Injectable, Optional} from '@angular/core';
import {Configuration} from "../configuration";
import {HttpClient} from "@angular/common/http";
import {BASE_PATH} from "../variables";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RegionService {

  protected basePath = 'http://localhost:8080';
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  public getRegions(): Observable<string[]> {
    return this.httpClient.get<any>(`${this.basePath}/regions/` ,
      {
        withCredentials: this.configuration.withCredentials,
        }
      );
  }

}
