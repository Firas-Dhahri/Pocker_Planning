package com.example.pockerplanning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.pockerplanning.entities.Projet;
import com.example.pockerplanning.services.Interface.IProjetService;
import java.util.List;

@RestController
@RequestMapping("/Projet")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {

    @Autowired
    IProjetService projetService;

    @PostMapping("/addProjet")
    @ResponseBody
    public Projet addProjet(@RequestBody Projet projet)

    {
        return projetService.addProjet(projet);



    }
// http://localhost:8089/SpringMVC/operateur/retrieve-operateur/8

    @GetMapping("/retrieve-projet/{projetId}")

    @ResponseBody

    public Projet retrieveProjet(@PathVariable(value = "projetId") Long id) {

        return projetService.retrieveProjet(id);

    }

    @GetMapping("/retrieve-all-projets")
    @ResponseBody
    public List<Projet> getProjets() {

        return projetService.retrieveallProjets();
    }


    @PutMapping("/modify-projet/{projetId}")

    @ResponseBody

    public Projet modifyProjet(@RequestBody Projet projet, @PathVariable("projetId") Long id) {

        return projetService.updateProjet(projet, id);

    }




    @DeleteMapping("/remove-projet/{projetId}")

    @ResponseBody

    public void removeProjet(@PathVariable("projetId") Long id) {

        projetService.deleteProjet(id);

    }

    @PostMapping("/affecter-cartes-projet/{projetId}")
    @ResponseBody
    public Projet affecterCartesAProjet(@PathVariable long projetId, @RequestParam List<Long> carteId) {
        return projetService.affecterCartesAProjet(projetId, carteId);
    }

}
