package com.expensetracker.backend.service;

import com.expensetracker.backend.entity.Income;
import com.expensetracker.backend.repository.IncomeRepository;
import com.expensetracker.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.expensetracker.backend.entity.User;
import java.util.List;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
private UserRepository userRepository;

    public List<Income> findByUserEmail(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return incomeRepository.findByUser(user);
}
    public Income addIncome(Income income, String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    income.setUser(user);

    return incomeRepository.save(income);
}

    public List<Income> getAllIncome() {
        return incomeRepository.findAll();
    }

    public Income updateIncome(Long id, Income updatedIncome) {

        Income income = incomeRepository.findById(id).orElseThrow();

        income.setTitle(updatedIncome.getTitle());
        income.setAmount(updatedIncome.getAmount());
        income.setSource(updatedIncome.getSource());
        income.setDate(updatedIncome.getDate());
        income.setNotes(updatedIncome.getNotes());

        return incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }

}
