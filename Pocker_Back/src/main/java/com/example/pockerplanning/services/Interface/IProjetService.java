package com.example.pockerplanning.services.Interface;
import com.example.pockerplanning.entities.Projet;

import java.util.List;

public interface IProjetService {

    Projet addProjet(Projet projet);
    List<Projet> retrieveallProjets();

    Projet retrieveProjet(Long id);
    Projet updateProjet(Projet projet);

    void deleteProjet(Long id);

}
