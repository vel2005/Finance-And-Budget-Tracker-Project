package com.expensetracker.backend.controller;

import com.expensetracker.backend.entity.Budget;
import com.expensetracker.backend.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

   @PostMapping
public Budget addBudget(
        @RequestBody Budget budget,
        Authentication authentication) {

    return budgetService.addBudget(
            budget,
            authentication.getName()
    );
}
    @GetMapping
public List<Budget> getAllBudgets(Authentication authentication) {

    return budgetService.findByUserEmail(
            authentication.getName()
    );
}

    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id,
                               @RequestBody Budget budget) {
        return budgetService.updateBudget(id, budget);
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {

        budgetService.deleteBudget(id);

        return "Budget Deleted Successfully";
    }
}