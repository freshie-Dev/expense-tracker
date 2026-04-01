export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  date: string; // ISO date (YYYY-MM-DD)
  description?: string;
}

