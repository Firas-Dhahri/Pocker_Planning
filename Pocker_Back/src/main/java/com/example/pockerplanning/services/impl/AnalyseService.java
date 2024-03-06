package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.*;
import com.example.pockerplanning.repository.AnalyseRepository;
import com.example.pockerplanning.repository.ProjetRepository;
import com.example.pockerplanning.repository.SprintRepository;
import com.example.pockerplanning.repository.TicketRepository;
import com.example.pockerplanning.services.Interface.IAnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AnalyseService implements IAnalyseService {

    @Autowired
    AnalyseRepository analyseRepository;
    @Autowired
    ProjetRepository projetReposiroty;
    @Autowired
    SprintRepository sprintRepository;
    @Autowired
    TicketRepository ticketRepository;

    @Override
    public Analyse ajouterAnalyse(Analyse analyse, Long id_projet) {
        Projet p = projetReposiroty.findById(id_projet).orElse(null);
        //  Ticket t=ticketRepository.findById(id_ticket).orElse(null);
        analyse.setProjet(p);
        return analyseRepository.save(analyse);
    }

    @Override
    public Analyse ajouterAnalyse_Us(Analyse analyse, long id_ticket) {
        Ticket t = ticketRepository.findById(id_ticket).orElse(null);
        analyse.setTicket((t));
        return analyseRepository.save(analyse);
    }

    @Override
    public List<Sprint> sprint_en_retard(Long id) {
        List<Sprint> allSprints = sprintRepository.getprojet_par_sprint(id);
        List<Sprint> sprintsEnRetard = new ArrayList<>();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

        for (Sprint sp : allSprints) {
            try {
                Date endDate = dateFormat.parse(sp.getEndDate());
                Date realEndDate = sp.getReal_end_date();
                if (endDate.before(realEndDate)) {
                    sprintsEnRetard.add(sp);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        System.out.println("lista loula " + allSprints.size() + "lista thenia" + allSprints.size());
        return sprintsEnRetard;
    }

    @Override
    public List<Sprint> sprint_en_cours(Long id) {
        List<Sprint> allSprints = sprintRepository.getprojet_par_sprint(id);
        List<Sprint> sprintsEnCours = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        for (Sprint sp : allSprints) {
            try {
                Date endDate = dateFormat.parse(sp.getEndDate());
                Date starrDate = dateFormat.parse(sp.getStartDate());
                Date currentDate=new Date();
                System.out.println("lyoum :"+currentDate+"ghodwa :"+starrDate+"berah :"+endDate);
                if (currentDate.before(endDate)&&(currentDate.after(starrDate))) {
                    sprintsEnCours.add(sp);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }


        return sprintsEnCours; }

    @Override
    public List<Analyse> afficherAnalyse() {
        List<Analyse> list = analyseRepository.findAll();
        return analyseRepository.findAll();
    }

    @Override
    public ResponseEntity<Map<Long, Date>> getprojetpartime(Long id_projet) {
        List<Ticket> ticketList = ticketRepository.ticket_projet( id_projet);
        Projet p = projetReposiroty.findById(id_projet).orElse(null);
        Map<Long, Date> maps = new HashMap<>();
        Date ds = p.getDate_debut();
        for (Ticket t : ticketList) {
            while (ds.before(p.getDate_fin())) {
                maps.putIfAbsent(t.getId(), ds);
                ds.setMonth(ds.getMonth() + 1);
                System.out.println(ds);
            }
        }
        return ResponseEntity.ok(maps);
    }

    @Override
    public Float Pourcentage_avancemenet_pojet(Long id_projet) {
        float pourcentage;
        Projet p = projetReposiroty.findById(id_projet).orElse(null);
        List<Sprint> ticketList = sprintRepository.getprojet_par_sprint(id_projet);

        List<Sprint> ticket_complete = sprintRepository.ticket_projet_complet(id_projet);
        pourcentage = (float) ticket_complete.size() / (float) ticketList.size();
        System.out.println("wiem" + ticketList.size() + "//" + ticket_complete.size() + "  " + pourcentage);
        return pourcentage * 100;
    }


    public ResponseEntity<Map<Long, Long>> GetProjetParSprint(Long id) {
        List<Sprint> sprintList = sprintRepository.getprojet_par_sprint(id);
        Map<Long, Long> maps = new HashMap<>();
        for (Sprint sp : sprintList) {
            String ed = sp.getEndDate();
            Long sprint_id = sp.getId();
            String sd = sp.getStartDate();
            long differenceInDays = 0;
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            try {
                Date end_date = dateFormat.parse(ed);
                Date start_date = dateFormat.parse(sd);
                long differenceInMillis = end_date.getTime() - start_date.getTime();
                differenceInDays = differenceInMillis / (24 * 60 * 60 * 1000);
                System.out.println("nammme: " + differenceInDays);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            maps.putIfAbsent(sprint_id, differenceInDays);
        }
        System.out.println("jobjob " + maps.size());
        return ResponseEntity.ok(maps);
    }

    @Override
    public List<Analyse> afficherAnalyse_projet() {
        return analyseRepository.getAnalys_projet();
    }

    @Override
    public List<Analyse> afficherAnalyse_Us() {
        return analyseRepository.getAnalys_Us();
    }

    @Override
    public Analyse afficher_one_Analyse(int id) {
        return analyseRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteAnalyse(int id) {
        Analyse analyse = analyseRepository.findById(id).orElse(null);
        analyseRepository.delete(analyse);
    }

    @Override
    public Analyse updateAnalyse(Analyse a, int id_analyse) {
        Analyse analyse = afficher_one_Analyse(id_analyse);
        return analyseRepository.save(a);
    }

    @Override
    public List<Analyse> getAnalyse_par_ordre_chronologique() {
        return analyseRepository.getAnalyseparsprint();
    }
    @Override
    public Ticket getticket_par_id(Long id_ticket){
        return  ticketRepository.findById(id_ticket).orElse(null);
    }


    @Override
    public Boolean sprint_priorite(Long id)
    {
        Sprint sp=sprintRepository.findById(id).orElse(null);
        float pr=1;
        Set<Ticket> alltickets=sp.getTickets();
        List<Ticket> ticket_priorite=new ArrayList<>();
        for(Ticket t:alltickets){
            System.out.println("lista33"+t.getFields().getPriority().getName());
            if(t.getFields().getPriority().getName()=="LOW"){
                ticket_priorite.add(t);
            }
            pr=(float) ticket_priorite.size()/(float)alltickets.size();

        }
        System.out.println("pr2: "+pr+"  "+ticket_priorite.size()+"//"+alltickets.size());
        if(pr>0.5){return false;}
        else return true;

    }
}