package com.expensetracker.backend.service;

import com.expensetracker.backend.entity.Expense;

import com.expensetracker.backend.repository.ExpenseRepository;
import com.expensetracker.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.expensetracker.backend.entity.User;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
private UserRepository userRepository;

    public Expense addExpense(Expense expense, String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    expense.setUser(user);

    return expenseRepository.save(expense);
}
public List<Expense> findByUserEmail(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return expenseRepository.findByUser(user);
}

    public List<Expense> getAllExpense() {
        return expenseRepository.findAll();
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id).orElseThrow();

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setDate(updatedExpense.getDate());
        expense.setNotes(updatedExpense.getNotes());

        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}