package com.example.pockerplanning.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "*", maxAge = 3600)
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('ROLE_PRODUCT_OWNER') or hasRole('ROLE_SCRUM_MASTER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_DEVELOPER')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/scrmaster")
  @PreAuthorize("hasRole('ROLE_SCRUM_MASTER')")
  public String scrummasterAccess() {
    return "Scrum Master Board.";
  }

  @GetMapping("/prodowner")
  @PreAuthorize("hasRole('ROLE_PRODUCT_OWNER')")
  public String productownerAccess() {
    return "Product Owner Board.";
  }

  @GetMapping("/developer")
  @PreAuthorize("hasRole('ROLE_DEVELOPER')")
  public String developerAccess() {
    return "Developer Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public String adminAccess(@RequestBody String body) {
    System.out.println("Request received in adminAccess endpoint. Body: " + body);

    return "Admin Board.";
  }
}