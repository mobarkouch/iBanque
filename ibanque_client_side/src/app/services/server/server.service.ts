import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  public static serverIp: string = 'http://localhost:8080';
  constructor() { }
}
