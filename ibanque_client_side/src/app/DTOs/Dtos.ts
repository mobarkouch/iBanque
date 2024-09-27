export type debit_credit_object = {
  accountId : string,
  amount: number,
  description: string
}

export type transfer_object = debit_credit_object & {accountDestination : string}
