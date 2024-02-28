package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Priorite;
import com.example.pockerplanning.entities.Reclamation;
import com.example.pockerplanning.entities.Statut;
import com.example.pockerplanning.entities.TypeReclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    List<Reclamation> findByStatut(Statut statut);
    List<Reclamation> findByPriorite(Priorite priorite);
    List<Reclamation> findByType(TypeReclamation type);

    List<Reclamation> findByUtilisateurTraitantId(Long utilisateurTraitantId);

}
