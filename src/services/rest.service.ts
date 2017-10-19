

// Core components
import { Injectable }   from '@angular/core';
import { Http, Response }         from '@angular/http';
import { Observable } from 'rxjs';
// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class RestService {

    private baseUrl: string = 'http://localhost:8080/';
    private apiCategorie : string = 'apiIFindCategorie';
    private apiStore : string = 'apiIFindStore';

    constructor(private http: Http) { }

    public getCategories(): Observable<any> {

		const url = `${this.baseUrl}${this.apiCategorie}`;
        
        return this.http.get(url).map((response: Response) => response.json());
    }

    public getStores(): Observable<any> {

		const url = `${this.baseUrl}${this.apiStore}`;
        
        return this.http.get(url).map((response: Response) => response.json());
    }

}