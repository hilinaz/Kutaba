export type TransactionData = {
  id: string;
  categoryId: string;
  transactionType: string;
  amount: string;
  accountId: string;
  description: string;
  createdAt: Date;
  categoryName?: string;
  accountName?: string;
};