package com.expensetracker.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {

    private String name;

    private String phone;

    private String gender;

    private String dob;

    private String country;

    private String occupation;

    private String currency;
}