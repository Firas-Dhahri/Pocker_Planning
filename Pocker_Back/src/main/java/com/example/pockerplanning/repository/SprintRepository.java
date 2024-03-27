package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Long> {
    @Query("Select a from Sprint a where a.projet.id=:id_projet")
    List<Sprint> getprojet_par_sprint(@Param("id_projet") Long id_projet);

    @Query("Select a from Sprint a where a.projet.id=:id_projet ")
    List<Sprint> getprojet_par_cours(@Param("id_projet") Long id_projet);
    @Query("Select a from Sprint a where   a.projet.id=:id_projet and a.real_end_date< CURRENT_DATE")
    List<Sprint> ticket_projet_complet(@Param("id_projet") Long id_projet);

}
