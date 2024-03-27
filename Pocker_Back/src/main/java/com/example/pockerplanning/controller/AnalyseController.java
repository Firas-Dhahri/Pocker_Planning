package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.*;
import com.example.pockerplanning.repository.AnalyseRepository;
import com.example.pockerplanning.repository.ProjetRepository;
import com.example.pockerplanning.services.Interface.IAnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AnalyseController {

    @Autowired
    IAnalyseService analyseService;
    @Autowired
    AnalyseRepository analyseRepository ;
    @Autowired
    ProjetRepository projetRepository;

    //http://localhost:8088/Spring/etudiant/retrieve-all-etudiants
    @GetMapping("/retrieve-all-Analyses")
    @ResponseBody
    public List<Analyse> getAnalyses() {
        List<Analyse> listAnalyse = analyseService.afficherAnalyse();
        return listAnalyse;
    }
    @GetMapping("/getAnalyses_par_projets/{id}")
    @ResponseBody
    public Analyse getAnalyses_par_projets(@PathVariable Long id) {
        Projet p = projetRepository.findById(id).orElse(null);
        return analyseRepository.findByProjet(p);
    }

    @GetMapping("/getAnalyses_par_projets_khalil")
    @ResponseBody
    public List<Analyse> getAnalyses_par_projets2() {

        return analyseService.afficherAnalyse_projet();
    }
    @GetMapping("/get_analyse_retard/{projet-id}")
    @ResponseBody
    public List<Sprint> get_analyse_retard(@PathVariable("projet-id") Long id) {
        return analyseService.sprint_en_retard(id);
    }
    @GetMapping("/get_sprint_en_cours/{projet-id}")
    @ResponseBody
    public List<Sprint> get_analyse_en_cours(@PathVariable("projet-id") Long id) {
        return analyseService.sprint_en_cours(id);
    }

    @GetMapping("/getAnalyses_par_us")
    @ResponseBody
    public List<Analyse> getAnalyses_par_Us() {
        List<Analyse> listAnalyse = analyseService.afficherAnalyse_Us();
        return listAnalyse;
    }

    @GetMapping("/Liste_Sprint_par_projet/{projet-id}")
    @ResponseBody
    public ResponseEntity<?> affichersprint_par_projet(@PathVariable("projet-id") Long id) {
        return analyseService.GetProjetParSprint(id);
    }
    @GetMapping("/affichersprint_par_projet_ideal/{projet-id}")
    @ResponseBody
    public ResponseEntity<?> affichersprint_par_projet_ideal(@PathVariable("projet-id") Long id) {
        return analyseService.GetProjetParSprintIdeal(id);
    }

    @GetMapping("/get_ticket_par_mois/{projet-id}")
    @ResponseBody
    public ResponseEntity<?> get_ticket_par_mois(@PathVariable("projet-id") Long id) {
        return analyseService.get_ticket_par_mois(id);
    }

    @GetMapping("/getprojet_par_time/{projet-id}")
    public ResponseEntity<?> getprojetpartime(@PathVariable("projet-id") Long id) {
        return analyseService.getprojetpartime(id);
    }
    @GetMapping("/get_pourcentage_avancement/{projet-id}")
    public Float get_pourcentage_avancement(@PathVariable("projet-id") Long id) {
        return analyseService.Pourcentage_avancemenet_pojet(id);
    }


    // http://localhost:8088/Spring/etudiant/retrieve-etudiant/8
    @GetMapping("/retrieve-Analyse/{Analyse-id}")
    @ResponseBody
    public Analyse retrieveHistorique(@PathVariable("Analyse-id") int id) {
        return analyseService.afficher_one_Analyse(id);
    }




    @GetMapping("/retrieve-Analyse_par_sprint_par_ordre/{Analyse-id}")
    public List<Analyse> retrieve_Analyse_par_sprint() {

        return analyseService.getAnalyse_par_ordre_chronologique();
    }

    // http://localhost:8088/Spring/etudiant/add-etudiant
    @PostMapping("/add-Analyse/{id_projet}")
    @ResponseBody
    public Analyse addAnalyse(@RequestBody Analyse ae,@PathVariable("id_projet") Long id_projet)
    {
        Analyse analyse = analyseService.ajouterAnalyse(ae,id_projet);

        return analyse;
    }
    @PostMapping("/add-Analyse_us/{id_ticket}")
    @ResponseBody
    public Analyse addAnalyse_us(@RequestBody Analyse ae,@PathVariable("id_ticket") long id_ticket)
    {
        Analyse analyse = analyseService.ajouterAnalyse_Us(ae,id_ticket);

        return analyse;
    }

    // http://localhost:8088/Spring/etudiant/update-etudiant/{etudiant-id}
    @PutMapping("/update-Analyse/{Analyse-id}")
    @ResponseBody
    public Analyse updateAnalyse(@PathVariable("Analyse-id") int id, @RequestBody Analyse ue) {
        ue.setId(id);
        return analyseService.updateAnalyse(ue, id);
    }

    // http://localhost:8088/Spring/etudiant/delete-etudiant/{etudiant-id}
    @DeleteMapping("/delete-Analyse/{Analyse-id}")
    @ResponseBody
    public void deleteAnalyse(@PathVariable("Analyse-id") int id) {
        analyseService.deleteAnalyse(id);
    }


    @GetMapping("/retrieve-ticket/{ticket-id}")
    @ResponseBody
    public Ticket retrieveTicket(@PathVariable("ticket-id") Long id) {
        return analyseService.getticket_par_id(id);
    }

    @GetMapping("/ticket_priorite/{sprint_id}")
    @ResponseBody
    public boolean ticket_priorite(@PathVariable("sprint_id") Long id) {

        return analyseService.sprint_priorite(id);
    }
    @GetMapping("/Affection_ticket_dev/{ticket_id}")
    @ResponseBody
    public List<User> user_dev(@PathVariable("ticket_id") Long ticket_id) {
       return analyseService.Affection_ticket_dev(ticket_id);
    }
    @GetMapping("evolutionComplexiteUtilisateur/{id}")
    public ResponseEntity<Map<Date, Float>> getUserEvolution(@PathVariable("id") Long userId) {
        Map<Date, Float> evolution = analyseService.evolutionComplexiteUtilisateur(userId);
        return ResponseEntity.ok(evolution);
    }

}


