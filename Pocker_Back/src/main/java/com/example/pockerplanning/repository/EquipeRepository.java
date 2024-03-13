package com.example.pockerplanning.repository;
import com.example.pockerplanning.entities.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Integer> {
    //@Query("SELECT u FROM User u JOIN u.equipes e WHERE e.id = :equipeId AND (LOWER(u.nom) LIKE LOWER(concat('%', :criteria, '%')) OR LOWER(u.prenom) LIKE LOWER(concat('%', :criteria, '%')))")
    //List<User> findMembersByCriteriaInTeam(@Param("equipeId") String equipeId, @Param("criteria") String criteria);
}