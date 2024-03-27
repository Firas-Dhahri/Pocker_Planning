package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipRepository extends JpaRepository<Equipe,Long> {


}
