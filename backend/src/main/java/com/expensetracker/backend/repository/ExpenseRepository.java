package com.expensetracker.backend.repository;
import com.expensetracker.backend.entity.User;
import com.expensetracker.backend.entity.Expense;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findTop5ByOrderByDateDesc();
    List<Expense> findByUser(User user);
}