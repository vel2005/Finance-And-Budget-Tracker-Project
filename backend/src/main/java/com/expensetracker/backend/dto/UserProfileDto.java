package com.expensetracker.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {

    private String name;
    private String email;
    private String phone;
     private String gender;

    private String dob;

    private String country;

    private String occupation;

    private String currency;
}