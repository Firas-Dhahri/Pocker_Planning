package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Carte;
import com.example.pockerplanning.services.Interface.ICarteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Carte")
@CrossOrigin(origins = "http://localhost:4200")
public class CarteController {

    @Autowired
    ICarteService carteService;

    @PostMapping("/addCarte")
    @ResponseBody
    public Carte addCarte(@RequestBody Carte carte)

    {
        return carteService.addCarte(carte);



    }
// http://localhost:8089/SpringMVC/operateur/retrieve-operateur/8

    @GetMapping("/retrieve-carte/{carteId}")

    @ResponseBody

    public Carte retrieveCarte(@PathVariable(value = "carteId") Long id) {

        return carteService.retrieveCarte(id);

    }

    @GetMapping("/retrieve-all-cartes")
    @ResponseBody
    public List<Carte> getCartes() {

        return carteService.retrieveallCartes();
    }


    @PutMapping("/modify-carte")

    @ResponseBody

    public Carte modifyCarte(@RequestBody Carte carte) {

        return carteService.updateCarte(carte);

    }




    @DeleteMapping("/remove-carte/{carteId}")

    @ResponseBody

    public void removeCarte(@PathVariable("carteId") Long id) {

        carteService.deleteCarte(id);

    }

}
