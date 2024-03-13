package com.example.pockerplanning.services.Interface;
import com.example.pockerplanning.entities.Projet;

import java.util.List;

public interface IProjetService {

    Projet addProjet(Projet projet);
    List<Projet> retrieveallProjets();

    Projet retrieveProjet(Long id);
    Projet updateProjet(Projet projet, Long id);

    void deleteProjet(Long id);
    Projet affecterCartesAProjet(Long projetId, List<Long> carteId);
    void affecterEquipeAProjet(int equipeId, List<Long> projetIds);

}
