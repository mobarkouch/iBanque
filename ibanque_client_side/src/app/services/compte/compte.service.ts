import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../server/server.service";
import {Observable} from "rxjs";
import {CompteInfos} from "../../models/compte/compte.infos.model";
import {debit_credit_object, transfer_object} from "../../DTOs/Dtos";

@Injectable({
  providedIn: 'root'
})
export class CompteService implements OnInit{
  serverIp : String = ServerService.serverIp;
  //private transfertDTO = DebitCredit & {dist : string}

  constructor(private http : HttpClient) { }

  public getById(id : String, page : number, size : number) : Observable<CompteInfos>{
    return this.http.get<CompteInfos>(`${this.serverIp}/accounts/${id}/pageOperations?page=${page}&size=${size}`);

  }

  public debitOperation(obj : debit_credit_object){
    return this.http.post(`${this.serverIp}/accounts/debit`,obj);
  }

  public creditOperation(obj : debit_credit_object){
    return this.http.post(`${this.serverIp}/accounts/credit`,obj);
  }

  public transferOperation(obj : transfer_object){
    return this.http.post(`${this.serverIp}/accounts/transfer`,obj);
  }
  ngOnInit(): void {
  }
}
