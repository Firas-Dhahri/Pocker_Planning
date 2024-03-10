package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetReposiroty extends JpaRepository<Projet, Integer> {

}
