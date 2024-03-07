package com.example.pockerplanning.services.Interface;

import com.example.pockerplanning.entities.Priorite;
import com.example.pockerplanning.entities.Reclamation;
import com.example.pockerplanning.entities.Statut;
import com.example.pockerplanning.entities.TypeReclamation;

import java.util.List;
import java.util.Optional;

public interface IReclamationService {

    List<Reclamation> getAllReclamations();

    Optional<Reclamation> getReclamationById(Long id);

    Reclamation createReclamation(Reclamation reclamation);

    Reclamation updateReclamation(Long id, Reclamation reclamation);

    void deleteReclamation(Long id);

    List<Reclamation> getReclamationsByStatut(Statut statut);
    List<Reclamation> getReclamationsByType(TypeReclamation type);
    List<Reclamation> getReclamationsByPriority(Priorite priorite);
    List<Reclamation> getReclamationsSortedByDate();
    Reclamation assignReclamationToUser(Long reclamationId, Long userId);
    List<Reclamation> getReclamationsAssignedToUser(Long userId);
    List<Reclamation> getFilteredReclamations(String statut, String priority, String type);

}

