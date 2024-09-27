import { Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {CompteComponent} from "./comptes/compte.component";
import {NewClientComponent} from "./new-client/new-client.component";

export const routes: Routes = [
  {
    path : "clients" , component : ClientsComponent
  },
  {
    path : "comptes" , component : CompteComponent
  },
  {
    path : "newClient" , component : NewClientComponent
  }

];
