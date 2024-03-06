package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.Carte;
import com.example.pockerplanning.entities.Projet;
import com.example.pockerplanning.repository.CarteRepository;
import com.example.pockerplanning.services.Interface.IProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.pockerplanning.repository.ProjetRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjetService implements IProjetService {

    @Autowired
    ProjetRepository projetr;
    @Autowired
    CarteRepository carter;
    @Override
    public Projet addProjet(Projet projet) {
        return projetr.save(projet);
    }

    @Override
    public List<Projet> retrieveallProjets() {
        return  (List<Projet>) projetr.findAll();
    }

    @Override
    public Projet retrieveProjet(Long id) {
        return projetr.findById(id).orElse(null);
    }

    @Override
    public Projet updateProjet(Projet projet, Long id) {
        if (!projetr.existsById(id)) {
            // If the project doesn't exist, you can handle the situation according to your requirements.
            // For example, you can throw an exception or return null.
            // Here, we are just returning null for simplicity.
            return null;
        }

        // Set the ID of the project to ensure it's updated properly
        projet.setId(id);

        // Save the updated project
        return projetr.save(projet);
    }

    @Override
    public void deleteProjet(Long id) {
        projetr.deleteById(id);
    }

    @Override
    public Projet affecterCartesAProjet(Long projetId, List<Long> carteId) {
        Projet projet = projetr.findById(projetId).orElse(null);

        if (projet != null) {
            // Create an empty list to store Carte objects
            List<Carte> cartes = new ArrayList<>();

            // Loop through the list of carteIds
            for (Long idc : carteId) {
                // Retrieve each Carte entity by its ID
                Carte carte = carter.findById(idc).orElse(null);

                // Check if the Carte entity exists
                if (carte != null) {
                    // Add the Carte entity to the list
                    cartes.add(carte);
                } else {
                    // Handle the case where a Carte entity with the given ID doesn't exist
                    // You may want to throw an exception or log a message here
                }
            }

            // Set the list of Carte objects to the projet
            projet.setCartes(cartes);

            // Save the projet entity to update its association with Carte entities
            projet = projetr.save(projet);

            return projet;
        } else {
            return null; // You can adjust the behavior accordingly
        }
    }
}
