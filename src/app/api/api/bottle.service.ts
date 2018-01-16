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


@Injectable()
export class BottleService {

    protected basePath = 'https://virtserver.swaggerhub.com/INFO806/Caveavin/1.0.0';
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
     * Create a new bottle
     * 
     * @param body Bottle object that needs to be added
     */
    public createBottle(body: Bottle): Observable<{}> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createBottle.');
        }

        let headers = this.defaultHeaders;

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
            'application/json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/bottle/create`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Delete a bottle
     * 
     * @param bottleId Bottle id to delete
     * @param apiKey 
     */
    public deleteBottle(bottleId: number, apiKey?: string): Observable<{}> {
        if (bottleId === null || bottleId === undefined) {
            throw new Error('Required parameter bottleId was null or undefined when calling deleteBottle.');
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

        return this.httpClient.delete<any>(`${this.basePath}/bottle/delete/${encodeURIComponent(String(bottleId))}`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Find a specific bottle
     * 
     * @param bottleId ID of bottle to return
     */
    public getBottleById(bottleId: number): Observable<Bottle> {
        if (bottleId === null || bottleId === undefined) {
            throw new Error('Required parameter bottleId was null or undefined when calling getBottleById.');
        }

        let headers = this.defaultHeaders;

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

        return this.httpClient.get<any>(`${this.basePath}/bottle/${encodeURIComponent(String(bottleId))}`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Find bottles for the userId
     * 
     * @param userId ID of cellar to return
     */
    public getBottlesUser(userId: number): Observable<Bottle> {
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getBottlesUser.');
        }

        let headers = this.defaultHeaders;

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

        return this.httpClient.get<any>(`${this.basePath}/bottle/getBottlesUser/${encodeURIComponent(String(userId))}`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Update an existing bottle
     * 
     * @param bottleId Id of the bottle that needs to be updated
     * @param date Updated date of the bottle
     * @param region Updated region of the vine
     * @param colour Updated colour of the vine
     */
    public updateBottle(bottleId: number, date?: number, region?: string, colour?: string): Observable<{}> {
        if (bottleId === null || bottleId === undefined) {
            throw new Error('Required parameter bottleId was null or undefined when calling updateBottle.');
        }

        let headers = this.defaultHeaders;

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
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (date !== undefined) {
            formParams = formParams.append('date', <any>date) || formParams;
        }
        if (region !== undefined) {
            formParams = formParams.append('region', <any>region) || formParams;
        }
        if (colour !== undefined) {
            formParams = formParams.append('colour', <any>colour) || formParams;
        }

        return this.httpClient.post<any>(`${this.basePath}/bottle/update/${encodeURIComponent(String(bottleId))}`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * Upload an image for the bottle
     * 
     * @param bottleId ID of bottle to update
     * @param additionalMetadata Additional data to pass to server
     * @param file file to upload
     */
    public uploadBottleFile(bottleId: number, additionalMetadata?: string, file?: Blob): Observable<ApiResponse> {
        if (bottleId === null || bottleId === undefined) {
            throw new Error('Required parameter bottleId was null or undefined when calling uploadBottleFile.');
        }

        let headers = this.defaultHeaders;

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
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (additionalMetadata !== undefined) {
            formParams = formParams.append('additionalMetadata', <any>additionalMetadata) || formParams;
        }
        if (file !== undefined) {
            formParams = formParams.append('file', <any>file) || formParams;
        }

        return this.httpClient.post<any>(`${this.basePath}/bottle/${encodeURIComponent(String(bottleId))}/uploadImage`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

}
