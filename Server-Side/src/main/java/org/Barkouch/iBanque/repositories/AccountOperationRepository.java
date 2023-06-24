package org.Barkouch.iBanque.repositories;

import org.Barkouch.iBanque.entities.AccountOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountOperationRepository  extends JpaRepository<AccountOperation,Long> {
    List<AccountOperation> findByBankAccount(String accountId);
    List<AccountOperation> findByBankAccountId(String accountId);
    Page<AccountOperation> findByBankAccountIdOrderByOperationDateDesc(String accountId, Pageable pageable);
}
