package com.example.pockerplanning.services.Interface;

import com.example.pockerplanning.entities.Analyse;
import com.example.pockerplanning.entities.Sprint;
import com.example.pockerplanning.entities.Ticket;
import org.springframework.http.ResponseEntity;


import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IAnalyseService {
    Analyse ajouterAnalyse(Analyse analyse,int id_projet);
    Analyse ajouterAnalyse_Us(Analyse analyse,long id_ticket);
    List<Analyse> afficherAnalyse();
    List<Analyse> afficherAnalyse_projet();
    List<Analyse> afficherAnalyse_Us();
    Analyse afficher_one_Analyse(int id);
    void deleteAnalyse(int id);
    Analyse updateAnalyse(Analyse e, int id_analyse);
    //get Analyse par ordre des Sprints
    List<Analyse> getAnalyse_par_ordre_chronologique();
    public ResponseEntity<?> GetProjetParSprint(int id);
    List<Sprint> sprint_en_retard(int id);
    List<Sprint> sprint_en_cours(int id);
    ResponseEntity<Map<Long, Date>> getprojetpartime(int id);
    Float Pourcentage_avancemenet_pojet(int id_projet);

    Ticket getticket_par_id(Long id_ticket);

    Boolean sprint_priorite(Long id);
}
