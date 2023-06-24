package org.Barkouch.iBanque.services;

import org.Barkouch.iBanque.entities.BankAccount;
import org.Barkouch.iBanque.entities.CurrentAccount;
import org.Barkouch.iBanque.entities.SavingAccount;
import org.Barkouch.iBanque.repositories.BankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BankService {
    @Autowired
    private BankAccountRepository bankAccountRepository;
    public void consulter(){
        BankAccount bankAccount =
                bankAccountRepository.findById("08a1a761-0f40-4627-b77c-1c42ed5a9e82").orElse(null);
        if (bankAccount != null) {
            System.out.println("******************");
            System.out.println(bankAccount.getId());
            System.out.println(bankAccount.getBalance());
            System.out.println(bankAccount.getStatus());
            System.out.println(bankAccount.getCreateDat());
            System.out.println(bankAccount.getCustomer().getName());
            System.out.println(bankAccount.getClass().getSimpleName());
            if (bankAccount instanceof CurrentAccount) {
                System.out.println("Over Draft=>" + ((CurrentAccount) bankAccount).getOverDraft());
            } else if (bankAccount instanceof SavingAccount) {
                System.out.println("Rate=>" + ((SavingAccount) bankAccount).getInterestRate());
            }
            bankAccount.getAccountOperations().forEach(op -> {

                System.out.println(op.getType() + "\t" + op.getAmount() + "\t" + op.getOperationDate());

            });
        }

    }
}
