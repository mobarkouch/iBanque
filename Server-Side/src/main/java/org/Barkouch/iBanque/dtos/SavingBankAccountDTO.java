package org.Barkouch.iBanque.dtos;


import org.Barkouch.iBanque.enums.AccountStatus;
import lombok.Data;
import java.util.Date;
@Data
public class SavingBankAccountDTO extends BankAccountDTO{

    private String id;
    private double balance;
    private Date createDat;
    private AccountStatus status ;
    private CustomerDTO customerDTO;
    private double interestRate;
}
