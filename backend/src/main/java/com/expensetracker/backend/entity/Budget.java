package com.expensetracker.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "budget")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {
    @ManyToOne
@JoinColumn(name = "user_id")
private User user;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String month;

    @Column(nullable = false)
    private Integer year;

}