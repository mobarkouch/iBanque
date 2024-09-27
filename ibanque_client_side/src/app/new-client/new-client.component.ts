import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Client} from "../models/client.model";
import {ClientService} from "../services/client/client.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent implements OnInit{
  newClientForm! : FormGroup;

  constructor(private formBuilder : FormBuilder, private clientService : ClientService, private router : Router) {
  }
  ngOnInit(): void {
    this.newClientForm = this.formBuilder.group({
      name : this.formBuilder.control("",[Validators.required, Validators.minLength(4)]),
      email : this.formBuilder.control("", [Validators.required, Validators.email])
    })
  }

  save() {
    let nvClient : Client = this.newClientForm.value;
    this.clientService.save(nvClient).subscribe({
      next : () : void => alert("le client a été inséré avec succès"),
      error : (err) : void => {
        alert("Une erreur inconnue est survenue!");
        console.log(err);
      }
    })

  }

  back() {
    this.router.navigateByUrl("/clients")
  }
}
