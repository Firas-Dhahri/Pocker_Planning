package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Equipe;
import com.example.pockerplanning.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    @Query("SELECT u FROM User u JOIN u.equipes e WHERE e.id = :equipeId AND (LOWER(u.nom) LIKE LOWER(concat('%', :criteria, '%')) OR LOWER(u.prenom) LIKE LOWER(concat('%', :criteria, '%')))")
    List<User> findMembersByCriteriaInTeam(@Param("equipeId") String equipeId, @Param("criteria") String criteria);
}

