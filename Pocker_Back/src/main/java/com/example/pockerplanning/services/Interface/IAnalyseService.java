package com.example.pockerplanning.services.Interface;

import com.example.pockerplanning.entities.*;
import org.springframework.http.ResponseEntity;


import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IAnalyseService {
    Analyse ajouterAnalyse(Analyse analyse,Long id_projet);

    Analyse ajouterAnalyse_Us(Analyse analyse,long id_ticket);
    List<Analyse> afficherAnalyse();
    List<Analyse> afficherAnalyse_projet();
    List<Analyse> afficherAnalyse_Us();
    Analyse afficher_one_Analyse(int id);
    void deleteAnalyse(int id);
    Analyse updateAnalyse(Analyse e, int id_analyse);
    //get Analyse par ordre des Sprints
    List<Analyse> getAnalyse_par_ordre_chronologique();
    public ResponseEntity<?> GetProjetParSprint(Long id);
    public ResponseEntity<?> GetProjetParSprintIdeal(Long id);
    List<Sprint> sprint_en_retard(Long id);
    List<Sprint> sprint_en_cours(Long id);
    ResponseEntity<Map<Long, Date>> getprojetpartime(Long id);
    Float Pourcentage_avancemenet_pojet(Long id_projet);

    Ticket getticket_par_id(Long id_ticket);

    Boolean sprint_priorite(Long id);

    //public ResponseEntity< Map<String,Integer>> get_ticket_par_mois(Long id_projet) ;

    public ResponseEntity<Map<String,Integer>> get_ticket_par_mois(Long id_projet) ;
    void sendSessionAddedEmail();
    void exportToPdf(Analyse analyse, String filePath)throws IOException;

    List<User> Affection_ticket_dev(Long id_ticket);


    public Map<Date, Float> evolutionComplexiteUtilisateur(Long id_user) ;



}
