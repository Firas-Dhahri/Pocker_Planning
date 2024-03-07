package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.User;
import com.example.pockerplanning.repository.UserRepository;
import com.example.pockerplanning.services.impl.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReclamationService userService;

    @GetMapping("/assigned/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }
}
