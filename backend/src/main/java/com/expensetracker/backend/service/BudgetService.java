package com.expensetracker.backend.service;

import com.expensetracker.backend.entity.Budget;
import com.expensetracker.backend.repository.BudgetRepository;
import com.expensetracker.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.expensetracker.backend.entity.User;
@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;
    @Autowired
private UserRepository userRepository;
public Budget addBudget(Budget budget, String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    budget.setUser(user);

    return budgetRepository.save(budget);
}
    public List<Budget> findByUserEmail(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return budgetRepository.findByUser(user);
}

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public Budget updateBudget(Long id, Budget updatedBudget) {

        Budget budget = budgetRepository.findById(id).orElseThrow();

        budget.setCategory(updatedBudget.getCategory());
        budget.setAmount(updatedBudget.getAmount());
        budget.setMonth(updatedBudget.getMonth());
        budget.setYear(updatedBudget.getYear());

        return budgetRepository.save(budget);
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}