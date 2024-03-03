package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
}
