package com.expensetracker.backend.controller;

import com.expensetracker.backend.entity.Income;
import com.expensetracker.backend.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "http://localhost:5173")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @PostMapping
public Income addIncome(
        @RequestBody Income income,
        Authentication authentication) {

    return incomeService.addIncome(
            income,
            authentication.getName()
    );
}

    
    @GetMapping
public List<Income> getIncomeByEmail(Authentication authentication) {

    String email = authentication.getName();

    return incomeService.findByUserEmail(email);
}

    @PutMapping("/{id}")
    public Income updateIncome(@PathVariable Long id,
                               @RequestBody Income income) {
        return incomeService.updateIncome(id, income);
    }

    @DeleteMapping("/{id}")
    public String deleteIncome(@PathVariable Long id) {

        incomeService.deleteIncome(id);

        return "Income Deleted Successfully";
    }

}