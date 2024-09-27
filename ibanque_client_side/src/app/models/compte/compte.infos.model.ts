import {Operation} from "./operation.model";

export interface CompteInfos {
  owner : string;
  accountId: string
  balance: number
  currentPage: number
  totalPages: number
  pageSize: number
  accountOperationDTOS: Operation[]
}
