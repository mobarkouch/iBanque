import {Component, OnInit} from '@angular/core';
import {ClientService} from "../services/client/client.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Client} from "../models/client.model";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})

export class ClientsComponent implements OnInit{
  clients? : Array<Client>;
  messageError : String | null = null;
  searchFormGroup! : FormGroup;
  constructor( private clientService : ClientService, private formBuilder : FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });
    this.loadClients();
  }
  loadClients() {
    let kw = this.searchFormGroup?.value.keyword ;
    this.clientService.findBy(kw).subscribe({
      next : data => this.clients = data,
      error : err => {
        this.messageError = "Erreur lors la récupération de données"
        console.log(err)
      }
    });
  }

  delete(id : number) {
    if(!confirm("êtes-vous sûr?"))  return;

    this.clientService.delete(id).subscribe({
      next: () => this.loadClients(),
      error : err => alert("Suppression refuse")
    });
  }

  upDate(client: Client) {
  }

  reset() {
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });
    this.loadClients();
  }
}
