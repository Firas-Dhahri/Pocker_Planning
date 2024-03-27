package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Analyse;
import com.example.pockerplanning.entities.Projet;
import com.example.pockerplanning.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {

    @Query("SELECT t.sprint.projet FROM Ticket t WHERE t.id = :ticketId")
    Projet findProjetByTicketId(@Param("ticketId") Long ticketId);
}
