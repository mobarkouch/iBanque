import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {DatePipe, DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CompteService} from "../services/compte/compte.service";
import {CompteInfos} from "../models/compte/compte.infos.model";

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    DecimalPipe,
    DatePipe,
    NgClass,
    JsonPipe
  ],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit{
  compteFormGroup! : FormGroup;
  operationFormGroup! : FormGroup;
  compteInfo : CompteInfos | null = null ;
  page : number = 0;
  currentPage : number = 0;
  size : number = 5;

  constructor(private formBuilder : FormBuilder, private compteService : CompteService) {
  }
  ngOnInit(): void {
    this.compteFormGroup = this.formBuilder.group({
      compteId : this.formBuilder.control("")
    });
    this.operationFormGroup  = this.formBuilder.group({
      operationType : this.formBuilder.control(null),
      amount : this.formBuilder.control(0),
      desc : this.formBuilder.control(null),
      accountDestination : this.formBuilder.control(null)
    })
  }

  loadComptes() {
    let id : String = this.compteFormGroup.value.compteId;
    this.compteService.getById(id, this.page, this.size).subscribe({
      next : value => {
        this.compteInfo = value
      }
    })
  }

  reset() {
    this.compteInfo = null;
    this.currentPage = 0;
  }

  goToPage(page: number) {
    this.page = page;
    this.currentPage = page;
    this.loadComptes();
  }

  handleAccountOperation() {

    let compteId : string = this.compteFormGroup.value.compteId;
    let amount : number = this.operationFormGroup.value.amount;
    let desc : string = this.operationFormGroup.value.desc;
    let dist : string = this.operationFormGroup.value.accountDestination;


    switch (this.operationFormGroup.value.operationType){
      case 'DEBIT' : this.compteService.debitOperation({accountId : compteId,amount : amount, description : desc}).subscribe(
        {next : () => alert("La transaction de remise a été complétée avec succès!")}
      ); return;
      case 'CREDIT' : this.compteService.creditOperation({accountId : compteId,amount : amount, description : desc}).subscribe(
        {next : () => alert("La transaction de crédit a été complétée avec succès!")}
      ); return;
      case 'TRANSFER' : this.compteService.transferOperation({accountId : compteId,amount : amount, description : desc,accountDestination : dist}).subscribe(
        {next : () => alert("Le transfert s'est terminé avec succès!")}
      ); return;
    }

    // if(opType == 'DEBIT'){
    //   this.compteService.debitOperation({accountId : compteId,amount : amount, description : desc})
    // }else if(opType == 'CREDIT'){
    //   this.compteService.creditOperation({accountId : compteId,amount : amount, description : desc})
    // }else if(opType == 'TRANSFER'){
    //   this.compteService.transferOperation({accountId : compteId,amount : amount, description : desc,accountDestination : dist})
    // }

  }
}
