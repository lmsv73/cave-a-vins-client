/**
 * Cave à vins
 * API cave à vins
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { ApiResponse } from '../model/apiResponse';
import { Bottle } from '../model/bottle';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';
import {BottleType, Compartment} from '../index';


@Injectable()
export class BottleService {

    protected basePath = 'http://localhost:8080/api';
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

    /**
     * Create a new add-bottle
     *
     * @param body Bottle object that needs to be added
     */
    public createBottle(body: Bottle): Observable<{}> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createBottle.');
        }

        return this.httpClient.post<any>(`${this.basePath}/bottle/`,
            body,
            {
                withCredentials: this.configuration.withCredentials
            }
        );
    }

    /**
     * Delete a add-bottle
     *
     * @param bottleId Bottle id to delete
     */
    public deleteBottle(bottleId: number): Observable<{}> {
        if (bottleId === null || bottleId === undefined) {
            throw new Error('Required parameter bottleId was null or undefined when calling deleteBottle.');
        }

        return this.httpClient.delete<any>(`${this.basePath}/bottle/${encodeURIComponent(String(bottleId))}`,
            {
                withCredentials: this.configuration.withCredentials
            }
        );
    }

    /**
     * Update an existing add-bottle
     *
     * @param formData data
     */
    public updateBottle(formData: FormData): Observable<{}> {

      return this.httpClient.put<any>(`${this.basePath}/bottle/`,
        formData,
        {
          withCredentials: this.configuration.withCredentials
        }
      );
    }

    /**
     * Upload an image for the add-bottle
     *
     * @param formData  data to pass to server
     */
    public uploadBottleFile(formData: FormData): Observable<ApiResponse> {

        return this.httpClient.post<any>(`${this.basePath}/images/`,
            formData,
            {
                withCredentials: this.configuration.withCredentials
            }
        );
    }

}
