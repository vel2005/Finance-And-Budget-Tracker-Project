package com.expensetracker.backend.dto;

import com.expensetracker.backend.entity.Expense;
import com.expensetracker.backend.entity.Income;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Double totalIncome;

    private Double totalExpense;

    private Double balance;

    private Long totalTransactions;

    private List<Income> recentIncome;

    private List<Expense> recentExpense;

}