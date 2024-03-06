package com.example.pockerplanning.repository;


import com.example.pockerplanning.entities.ERole;
import com.example.pockerplanning.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
