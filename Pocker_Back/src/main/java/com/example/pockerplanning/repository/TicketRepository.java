package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    boolean existsByKey(String key);
    List<Ticket> findTicketsBySession_Id(Long sessionId);

    @Query("Select a from Ticket a where  a.sprint.projet.id =:id_projet ")
    List<Ticket> ticket_projet(@Param("id_projet") Long id_projet);
}