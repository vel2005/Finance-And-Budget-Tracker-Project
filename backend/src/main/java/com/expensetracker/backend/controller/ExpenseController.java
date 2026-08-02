package com.expensetracker.backend.controller;

import com.expensetracker.backend.entity.Expense;
import com.expensetracker.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/expense")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

   @PostMapping
public Expense addExpense(
        @RequestBody Expense expense,
        Authentication authentication) {

    return expenseService.addExpense(
            expense,
            authentication.getName()
    );
}

    @GetMapping
public List<Expense> getAllExpense(Authentication authentication) {

    return expenseService.findByUserEmail(
            authentication.getName()
    );
}

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                 @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {

        expenseService.deleteExpense(id);

        return "Expense Deleted Successfully";
    }
}