package com.example.pockerplanning.services.Interface;

import com.example.pockerplanning.entities.Carte;

import java.util.List;

public interface ICarteService {

    Carte addCarte(Carte carte);
    List<Carte> retrieveallCartes();

    Carte retrieveCarte(Long id);
    Carte updateCarte(Carte carte);

    void deleteCarte(Long id);

}
