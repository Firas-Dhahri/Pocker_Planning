package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.Carte;
import com.example.pockerplanning.services.Interface.ICarteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.pockerplanning.repository.CarteRepository;

import java.util.List;
@Service
public class CarteService implements ICarteService {

    @Autowired
    CarteRepository carter;

    @Override
    public Carte addCarte(Carte carte) {
        return carter.save(carte);
    }

    @Override
    public List<Carte> retrieveallCartes() {
        return (List<Carte>) carter.findAll();
    }

    @Override
    public Carte retrieveCarte(Long id) {
        return carter.findById(id).orElse(null);
    }

    @Override
    public Carte updateCarte(Carte carte, Long id) {
        if (!carter.existsById(id)) {

            return null;
        }

        // Set the ID of the carte to ensure it's updated properly
        carte.setId(id);

        // Save the updated project
        return carter.save(carte);    }


    @Override
    public void deleteCarte(Long id) {
        carter.deleteById(id);
    }
}
