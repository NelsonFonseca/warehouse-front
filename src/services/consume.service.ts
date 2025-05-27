import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConsumeService {

    readonly rootURL = 'http://localhost:8080';

    constructor(private http: HttpClient){}

    getList(method : string){
        return this.http.get(this.rootURL + method);
    }

    getOne(method : string, id : number){
        return this.http.get(this.rootURL + method +'/' + id);
    }

    update(method : string, body : any, id: number){
        return this.http.put(this.rootURL + method +'/' + id, body);
    }

    create(method : string, body : any){
        return this.http.post(this.rootURL + method, body);
    }

    delete(method : string, id : number){
        return this.http.delete(this.rootURL + method +'/' + id);
    }

    calculatePermutations(method : string, family : string, size : number){
        return this.http.get(this.rootURL + method +'?family=' + family + '&size=' + size);
    }

}
