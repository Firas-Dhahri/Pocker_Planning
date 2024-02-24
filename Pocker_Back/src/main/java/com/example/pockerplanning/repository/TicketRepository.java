package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {
    boolean existsByKey(String key);

    /*@Query("SELECT t FROM Ticket t JOIN t.sprints s WHERE s.name = :sprintName")
    List<Ticket> findTicketsBySprintName(@Param("sprintName") String sprintName);*/


}
