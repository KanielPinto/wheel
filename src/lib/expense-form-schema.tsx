import { z } from 'zod';

export const ExpenseFormSchema = z.object({
    beneficiary: z.string().min(1, 'Beneficiary is required'),
    transactionDate: z.string().min(1, 'Date is required'),
    amount: z.number().min(0.01, 'Amount must be greater than 0'),
    transactionType: z.enum(['deposit', 'withdrawal']).optional(),
    mode: z.enum(['UPI', 'IB', 'POS', 'NEFT', 'IMPS', 'TPT', 'CASH']).optional(),
    upiHandle: z.string().min(1, 'UPI-Handle is required').optional(),
    manual: z.number().min(1, 'Manual is required').optional(),
});

export type ExpenseFormData = z.infer<typeof ExpenseFormSchema>;
