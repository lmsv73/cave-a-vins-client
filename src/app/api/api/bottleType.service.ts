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

import { BottleType } from '../model/bottleType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';


@Injectable()
export class BottleTypeService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
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
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a new add-bottle type
     *
     * @param body A new add-bottle type
     */
    public addBottleType(body: BottleType): Observable<{}> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addBottleType.');
        }

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = this.defaultHeaders;
        headers = headers.set('Authorization', 'Bearer ' + currentUser.token);

        return this.httpClient.post<any>(`${this.basePath}/bottletype/`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Delete a add-bottle type
     *
     * @param bottletypeId BottleType id to delete
     * @param apiKey
     */
    public deleteBottleType(bottletypeId: number, apiKey?: string): Observable<{}> {
        if (bottletypeId === null || bottletypeId === undefined) {
            throw new Error('Required parameter bottletypeId was null or undefined when calling deleteBottleType.');
        }

        let headers = this.defaultHeaders;
        if (apiKey !== undefined && apiKey !== null) {
            headers = headers.set('api_key', String(apiKey));
        }

        // authentication (vinecellar_auth) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/bottletype/delete/${encodeURIComponent(String(bottletypeId))}`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Get the list of the add-bottle types
     */
    public getAllBottleTypes(): Observable<BottleType[]> {

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let headers = this.defaultHeaders;
      headers = headers.set('Authorization', 'Bearer ' + currentUser.token);
        return this.httpClient.get<any>(`${this.basePath}/bottletype/all`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Find bottle types
     *
     */
    public getBottlesType(): Observable<BottleType[]> {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = this.defaultHeaders;
        headers = headers.set('Authorization', 'Bearer ' + currentUser.token);

        return this.httpClient.get<any>(`${this.basePath}/bottletype/all`,
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        }
      );
    }

    /**
     * Update a add-bottle type
     *
     * @param formData data
     */
    public updateBottleType(formData: FormData): Observable<{}> {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let headers = this.defaultHeaders;
      headers = headers.set('Authorization', 'Bearer ' + currentUser.token);


      return this.httpClient.post<any>(`${this.basePath}/bottletype/update/`,
        formData,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

}
