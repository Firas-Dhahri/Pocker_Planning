package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    Optional<User> getUserByUsername(String username);

    User createUser(User user);

    User updateUser(User user);

    void deleteUser(Long id);


    String forgotPassword(String email);
}