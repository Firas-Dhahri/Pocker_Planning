package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.*;
import com.example.pockerplanning.repository.*;
import com.example.pockerplanning.services.Interface.IAnalyseService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
public class AnalyseService implements IAnalyseService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    AnalyseRepository analyseRepository;
    @Autowired
    ProjetRepository projetRepository;
    @Autowired
    SprintRepository sprintRepository;
    @Autowired
    TicketRepository ticketRepository;
    @Autowired
    EquipRepository equipRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Analyse ajouterAnalyse(Analyse analyse, Long id_projet) {
        Projet p = projetRepository.findById(id_projet).orElse(null);
        //  Ticket t=ticketRepository.findById(id_ticket).orElse(null);
        analyse.setProjet(p);

        // analyse.getProjet().getEquipe().getUsers()
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
                Date currentDate = new Date();
                System.out.println("lyoum :" + currentDate + "ghodwa :" + starrDate + "berah :" + endDate);
                if (currentDate.before(endDate) && (currentDate.after(starrDate))) {
                    sprintsEnCours.add(sp);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return sprintsEnCours;
    }

    @Override
    public List<Analyse> afficherAnalyse() {
        List<Analyse> list = analyseRepository.findAll();
        return analyseRepository.findAll();
    }

    @Override
    public ResponseEntity<Map<Long, Date>> getprojetpartime(Long id_projet) {
        List<Ticket> ticketList = ticketRepository.ticket_projet(id_projet);
        Projet p = projetRepository.findById(id_projet).orElse(null);
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
        Projet p = projetRepository.findById(id_projet).orElse(null);
        List<Sprint> ticketList = sprintRepository.getprojet_par_sprint(id_projet);

        List<Sprint> ticket_complete = sprintRepository.ticket_projet_complet(id_projet);
        pourcentage = (float) ticket_complete.size() / (float) ticketList.size();
        System.out.println("wiem" + ticketList.size() + "//" + ticket_complete.size() + "  " + pourcentage);
        return pourcentage * 100;
    }

    @Override
    public ResponseEntity<Map<String, Integer>> get_ticket_par_mois(Long id_projet) {
        List<Ticket> ticketList = ticketRepository.ticket_projet(id_projet);
        Map<String, Integer> maps = new HashMap<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        for (Ticket t : ticketList) {
            String ed = t.getFields().getCreated();
            LocalDate date;
            try {
                date = LocalDate.parse(ed, formatter);

                String moisAsString = String.format("%02d", date.getMonthValue());
                Set<Ticket> tickets = ticketRepository.ticket_mois(id_projet, moisAsString);
                System.out.println("lista99 : " + tickets.size());
                System.out.println("Mois99 : " + date.getMonthValue());
                maps.putIfAbsent(date.getMonth().name(), tickets.size());
            } catch (DateTimeParseException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(maps);
    }

    @Override
    public ResponseEntity<Map<Long, Long>> GetProjetParSprint(Long id) {
        List<Sprint> sprintList = sprintRepository.getprojet_par_sprint(id);
        Map<Long, Long> maps = new HashMap<>();
        for (Sprint sp : sprintList) {
            //    String ed = sp.getEndDate();
            Long sprint_id = sp.getId();
            String sd = sp.getStartDate();
            long differenceInDays = 0;
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            try {
                // Date end_date = dateFormat.parse(ed);
                Date start_date = dateFormat.parse(sd);
                long differenceInMillis = sp.getReal_end_date().getTime() - start_date.getTime();
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
    public Map<Date, Float> evolutionComplexiteUtilisateur(Long id_user) {
        User user = userRepository.findById(id_user).orElse(null);
        Map<Date, Float> evolution = new LinkedHashMap<>();
        List<Ticket> tickets = user.getTickets();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

        for (Ticket ticket : tickets) {
            try {
                String dateCreation = ticket.getFields().getCreated(); // Supposons que vous avez une méthode pour récupérer la date de création du ticket
                Float complexite = ticket.getFields().getCustomfield_10016(); // Supposons que vous avez une méthode pour récupérer la complexité du ticket
                Date date = dateFormat.parse(dateCreation);

                // Mettre à jour l'évolution de la complexité pour la date de création du ticket
                evolution.put(date, evolution.getOrDefault(date, 0f) + complexite);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        return evolution;
    }


    @Override
    public ResponseEntity<Map<Long, Long>> GetProjetParSprintIdeal(Long id) {
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
    public Ticket getticket_par_id(Long id_ticket) {
        return ticketRepository.findById(id_ticket).orElse(null);
    }


    @Override
    public Boolean sprint_priorite(Long id) {
        Sprint sp = sprintRepository.findById(id).orElse(null);
        System.out.println("lista33" + sp.getTickets());
        float pr = 1;
        Set<Ticket> alltickets = ticketRepository.ticket_sprint(id);
        List<Ticket> ticket_priorite = new ArrayList<>();
        for (Ticket t : alltickets) {
            System.out.println("lista33" + t.getFields().getPriority().getName());
            if ("low".equals(t.getFields().getPriority().getName())) {
                ticket_priorite.add(t);
            }
        }
        pr = (float) ticket_priorite.size() / (float) alltickets.size();
        System.out.println("pr2: " + pr + "  " + ticket_priorite.size() + "//" + alltickets.size());
        if
        (pr > 0.5) {
            return false;
        } else return true;

    }

    @Scheduled(cron = "0 0 8 * * MON")
    @Override
    public void sendSessionAddedEmail() {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        Analyse analyse = analyseRepository.findById(1).orElse(null);
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setFrom(new InternetAddress("pokerplaning0@gmail.com"));
            String[] recipients = {"khaliljobrane.karoui@gmail.com"};
            helper.setTo(recipients);
            helper.setSubject("Analyse X");
            // Message content
            String htmlContent = "<p>A new session has been added.</p>"
                    + "<p>We Have A New Session after 30 Minute:</p>"
                    + "<p>Please confirm your presence:</p>";

            helper.setText(htmlContent, true);

            // Export Analyse to PDF and save to file
            String filePath = "C:/Users/User/Desktop/pockerplanning/Pocker_Planning/exported_analysis.pdf";
            exportToPdf(analyse, filePath);

            // Attach the saved PDF to the email
            InputStreamSource attachmentSource = new ByteArrayResource(Files.readAllBytes(Paths.get(filePath)));
            helper.addAttachment("analyse_report.pdf", attachmentSource);

            javaMailSender.send(message);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }


    //khat
    //contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 12);
    @Override
    public void exportToPdf(Analyse analyse, String filePath) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 14);

                // Title
                contentStream.beginText();
                contentStream.newLineAtOffset(20, 700);
                contentStream.showText("Analysis Details:");
                contentStream.endText();

                // Details
                contentStream.beginText();
                contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 12);
                contentStream.newLineAtOffset(50, 670);
                contentStream.showText("Description: " + analyse.getDescription());
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Date of Analysis: " + analyse.getDate_analyse());

                contentStream.showText("Projet: " + analyse.getProjet().getTitre());

                List<Sprint> sprintList = this.sprint_en_cours(analyse.getProjet().getId());
                contentStream.showText("Sprints en cours: ");
                for (Sprint sprint : sprintList) {
                    contentStream.showText("  - Sprint name: " + sprint.getName());
                }

                // Add more details as needed
                contentStream.endText();
            }

            document.save(filePath);
        }
    }

    @Override
    public List<User> Affection_ticket_dev(Long id_ticket) {
        Ticket ticket = ticketRepository.findById(id_ticket).orElse(null);
        List<User> users_exprimente = new ArrayList<>();

        if (ticket != null) {
            Projet p = projetRepository.findProjetByTicketId(id_ticket);
            List<User> users = p.getEquipe().getUsers();
            for (User user : users) {
                System.out.println("test1" + user.getUsername() + ":: " + user.getTickets().size());
                float somme = 0;
                for (Ticket t : user.getTickets()) {
                    somme += t.getFields().getCustomfield_10016();
                }
                if (!user.getTickets().isEmpty()) {
                    float moyenne = somme / user.getTickets().size();
                    if (moyenne > ticket.getFields().getCustomfield_10016()) {
                        users_exprimente.add(user);
                    }
                    System.out.println("test1:::" + somme + "//" + moyenne);
                }
            }
        }
        return users_exprimente;
    }


}