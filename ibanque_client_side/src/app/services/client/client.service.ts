import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../models/client.model";
import {ServerService} from "../server/server.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit{
   serverIp : String = ServerService.serverIp;
  ngOnInit(): void {
  }
  constructor(private http : HttpClient) {
  }

  public findBy(kw : String) : Observable<Array<Client>>{
    return this.http.get<Array<Client>>(this.serverIp + "/customers/search?keyword="+kw);
  }

  public save(client : Client ) : Observable<Client>{
    return this.http.post<Client>(this.serverIp + "/customers", client);
  }

  public delete(id : number){
    return this.http.delete(this.serverIp + "/customers/" + id)
  }


}
