package com.expensetracker.backend.service;

import com.expensetracker.backend.dto.UpdateProfileRequest;
import com.expensetracker.backend.dto.UserProfileDto;
import com.expensetracker.backend.entity.User;
import com.expensetracker.backend.repository.UserRepository;
import com.expensetracker.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public UserProfileDto getProfile(String token) {

        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email).orElseThrow();

        return UserProfileDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();
    }

    public UserProfileDto updateProfile(String token,
                                        UpdateProfileRequest request) {

        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email).orElseThrow();

        user.setName(request.getName());
        user.setPhone(request.getPhone());

        userRepository.save(user);

        return UserProfileDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .gender(user.getGender())
        .dob(user.getDob())
        .country(user.getCountry())
        .occupation(user.getOccupation())
        .currency(user.getCurrency())
                .build();
    }
}