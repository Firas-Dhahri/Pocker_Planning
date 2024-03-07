package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.*;
import com.example.pockerplanning.repository.ReclamationRepository;
import com.example.pockerplanning.repository.UserRepository;
import com.example.pockerplanning.services.Interface.IReclamationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService implements IReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserRepository userRepository;


    @Override
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    @Override
    public Optional<Reclamation> getReclamationById(Long id) {
        return reclamationRepository.findById(id);
    }

    public Reclamation createReclamation(Reclamation reclamation) {
        reclamation.setDateSoumission(java.sql.Date.valueOf(LocalDate.now()));
        reclamation.setDateMiseAJour(null);
        Reclamation savedReclamation = reclamationRepository.save(reclamation);
        sendNotification(savedReclamation, "CREATE");
        return savedReclamation;
    }

    @Override
    public Reclamation updateReclamation(Long id, Reclamation reclamation) {
        Reclamation existingReclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Reclamation not found with id: " + id));
        existingReclamation.setDescription(reclamation.getDescription());
        existingReclamation.setType(reclamation.getType());
        existingReclamation.setPriorite(reclamation.getPriorite());
        existingReclamation.setStatut(reclamation.getStatut());
        existingReclamation.setPieceJointe(reclamation.getPieceJointe());
        existingReclamation.setDateMiseAJour(java.sql.Date.valueOf(LocalDate.now()));
        existingReclamation.setUtilisateurTraitantId(reclamation.getUtilisateurTraitantId());

        Reclamation updatedReclamation = reclamationRepository.save(existingReclamation);

        // Send notification
        sendNotification(updatedReclamation, "update");

        return updatedReclamation;
    }

    @Override
    public void deleteReclamation(Long id) {
        Reclamation deletedReclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Reclamation not found with id: " + id));

        // Send notification before deletion
        sendNotification(deletedReclamation, "delete");

        reclamationRepository.deleteById(id);
    }


    @Override
    public List<Reclamation> getReclamationsByStatut(Statut statut) {
        return reclamationRepository.findByStatut(statut);
    }

    @Override
    public List<Reclamation> getReclamationsByPriority(Priorite priorite) {
        return reclamationRepository.findByPriorite(priorite);
    }

    public List<Reclamation> getReclamationsByType(TypeReclamation type) {
        return reclamationRepository.findByType(type);
    }

    @Override
    public List<Reclamation> getReclamationsSortedByDate() {
        return reclamationRepository.findAll(Sort.by(Sort.Direction.ASC, "dateSoumission"));

    }

    @Override
    public Reclamation assignReclamationToUser(Long reclamationId, Long userId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId).orElse(null);
        if (reclamation != null) {
            reclamation.setUtilisateurTraitantId(userId);
            return reclamationRepository.save(reclamation);
        }
        return null;
    }

    @Override
    public List<Reclamation> getReclamationsAssignedToUser(Long userId) {
        return reclamationRepository.findByUtilisateurTraitantId(userId);
    }

    @Async

    public void sendNotification(Reclamation reclamation, String eventType) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        try {
            // Set email properties
            helper.setTo("chdouulaa@gmail.com");
            helper.setSubject("Notification: Reclamation " + eventType);
            helper.setText("A reclamation has been " + eventType.toLowerCase() + ": " + reclamation.getDescription());

            // Send email
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Handle exception
        }
    }

    public ReclamationService(NotificationService notificationService, ReclamationRepository reclamationRepository) {
        this.notificationService = notificationService;
        this.reclamationRepository = reclamationRepository;
    }

    @Scheduled(cron = "0 0/1 * * * *")
    public void checkAndSendNotifications() {
        int notificationsSent = 0; // Initialize count of notifications sent

        List<Reclamation> reclamationsInProgress = reclamationRepository.findByStatut(Statut.IN_PROGRESS);
        for (Reclamation reclamation : reclamationsInProgress) {
            notificationsSent++; // Increment count for each notification sent
        }

        System.out.println("Total notifications sent for reclamations in progress: " + notificationsSent);
    }

    @Override
    public List<Reclamation> getFilteredReclamations(String statut, String priority, String type) {
        if (statut == null || type == null) {
            throw new IllegalArgumentException("Statut and Type must not be null.");
        }

        Statut statutEnum = Statut.valueOf(statut);
        TypeReclamation typeEnum = TypeReclamation.valueOf(type);

        if (priority == null) {
            return reclamationRepository.findByStatutAndType(statutEnum, typeEnum);
        } else {
            Priorite priorityEnum = Priorite.valueOf(priority);
            return reclamationRepository.findByStatutAndPrioriteAndType(statutEnum, priorityEnum, typeEnum);
        }
    }
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }
}