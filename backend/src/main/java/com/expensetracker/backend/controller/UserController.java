package com.expensetracker.backend.controller;

import com.expensetracker.backend.dto.UpdateProfileRequest;
import com.expensetracker.backend.dto.UserProfileDto;
import com.expensetracker.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public UserProfileDto getProfile(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        return userService.getProfile(token);
    }

    @PutMapping("/profile")
    public UserProfileDto updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateProfileRequest request) {

        String token = authHeader.substring(7);

        return userService.updateProfile(token, request);
    }
}