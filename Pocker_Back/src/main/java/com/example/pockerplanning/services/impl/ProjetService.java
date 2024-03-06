package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.Projet;
import com.example.pockerplanning.services.Interface.IProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.pockerplanning.repository.ProjetRepository;

import java.util.List;

@Service
public class ProjetService implements IProjetService {

    @Autowired
    ProjetRepository projetr;
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
    public Projet updateProjet(Projet projet) {
        return projetr.save(projet);
    }

    @Override
    public void deleteProjet(Long id) {
        projetr.deleteById(id);
    }
}
