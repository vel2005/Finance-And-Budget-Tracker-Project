package com.expensetracker.backend.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.expensetracker.backend.dto.AuthResponse;
import com.expensetracker.backend.dto.LoginRequest;
import com.expensetracker.backend.dto.RegisterRequest;
import com.expensetracker.backend.entity.User;
import com.expensetracker.backend.repository.UserRepository;
import com.expensetracker.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
private JwtUtil jwtUtil;
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email already exists",null);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Password encoding later
                .phone(request.getPhone())
             
        

        .gender("Male")
        .dob("")
        .country("India")
        .occupation("")
        .currency("INR")

        
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return new AuthResponse("Registration Successful",null);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
           return new AuthResponse(
        "User not found",
        null
);
        }

        if (!passwordEncoder.matches(
        request.getPassword(),
        user.getPassword())) {

   return new AuthResponse(
        "Invalid Password",
        null
);
}

        String token = jwtUtil.generateToken(
        user.getEmail()
);

return new AuthResponse(
        "Login Successful",
        token
);
    }

}