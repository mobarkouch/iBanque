package org.Barkouch.iBanque.repositories;

import org.Barkouch.iBanque.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository  extends JpaRepository<BankAccount,String> {
}
