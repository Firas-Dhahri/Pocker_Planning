package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Carte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarteRepository extends JpaRepository<Carte, Long> {
}
