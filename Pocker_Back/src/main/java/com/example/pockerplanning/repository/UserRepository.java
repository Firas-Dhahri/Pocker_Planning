package com.example.pockerplanning.repository;


import com.example.pockerplanning.entities.Analyse;
import com.example.pockerplanning.entities.Role;
import com.example.pockerplanning.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);


  Optional<User> findByEmail(String email);
  @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'ROLE_DEVELOPER'")
  List<User> getUsersByRoleDev();
  @Query("SELECT u FROM User u JOIN u.equipes e   join e.Projets p join p.Sprints s join s.Tickets t  WHERE t.fields.customfield_10016>5")
  List<User> getUsersByTicket();

}
