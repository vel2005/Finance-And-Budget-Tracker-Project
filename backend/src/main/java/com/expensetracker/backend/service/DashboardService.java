package com.expensetracker.backend.service;

import com.expensetracker.backend.dto.DashboardResponse;
import com.expensetracker.backend.entity.Expense;
import com.expensetracker.backend.entity.Income;
import com.expensetracker.backend.repository.ExpenseRepository;
import com.expensetracker.backend.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public DashboardResponse getDashboard() {

        List<Income> incomes = incomeRepository.findAll();

        List<Expense> expenses = expenseRepository.findAll();

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double balance = totalIncome - totalExpense;

        long totalTransactions = incomes.size() + expenses.size();

        List<Income> recentIncome =
                incomeRepository.findTop5ByOrderByDateDesc();

        List<Expense> recentExpense =
                expenseRepository.findTop5ByOrderByDateDesc();

        return new DashboardResponse(
                totalIncome,
                totalExpense,
                balance,
                totalTransactions,
                recentIncome,
                recentExpense
        );
    }
}