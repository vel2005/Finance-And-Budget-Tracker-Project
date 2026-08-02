package com.expensetracker.backend.repository;

import com.expensetracker.backend.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import com.expensetracker.backend.entity.User;
import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findTop5ByOrderByDateDesc();
     List<Income> findByUserEmail(String email);
     List<Income> findByUser(User user);
}