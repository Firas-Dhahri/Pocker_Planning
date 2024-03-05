package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Priorite;
import com.example.pockerplanning.entities.Reclamation;
import com.example.pockerplanning.entities.Statut;
import com.example.pockerplanning.entities.TypeReclamation;
import com.example.pockerplanning.services.impl.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reclamations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReclamationRestController {

    @Autowired
    private ReclamationService reclamationService;



    @GetMapping
    public ResponseEntity<List<Reclamation>> getAllReclamations() {
        List<Reclamation> reclamations = reclamationService.getAllReclamations();
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable Long id) {
        Optional<Reclamation> reclamation = reclamationService.getReclamationById(id);
        return reclamation.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/create-reclamation")
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        Reclamation createdReclamation = reclamationService.createReclamation(reclamation);
        return new ResponseEntity<>(createdReclamation, HttpStatus.CREATED);
    }

    @PutMapping("/update-reclamation/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody Reclamation reclamation) {
        Reclamation updatedReclamation = reclamationService.updateReclamation(id, reclamation);
        return new ResponseEntity<>(updatedReclamation, HttpStatus.OK);
    }

    @DeleteMapping("/delete-reclamation/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/byStatut/{statut}")
    public ResponseEntity<List<Reclamation>> getReclamationsByStatut(@PathVariable Statut statut) {
        List<Reclamation> reclamations = reclamationService.getReclamationsByStatut(statut);
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }
    @GetMapping("/priority/{priority}")
    public List<Reclamation> getReclamationsByPriority(@PathVariable Priorite priority) {
        return reclamationService.getReclamationsByPriority(priority);
    }
    @GetMapping("/Type/{type}")
    public List<Reclamation> getReclamationsByType(@PathVariable TypeReclamation type) {
        return reclamationService.getReclamationsByType(type);
    }

    @GetMapping("/sorted-by-date")
    public ResponseEntity<List<Reclamation>> getReclamationsSortedByDate() {
        List<Reclamation> reclamations = reclamationService.getReclamationsSortedByDate();
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }
    //***************************************
    @PutMapping("/{reclamationId}/assign/{userId}")
    public ResponseEntity<Reclamation> assignReclamationToUser(@PathVariable Long reclamationId, @PathVariable Long userId) {
        Reclamation assignedReclamation = reclamationService.assignReclamationToUser(reclamationId, userId);
        if (assignedReclamation != null) {
            return new ResponseEntity<>(assignedReclamation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/assigned/{userId}")
    public ResponseEntity<List<Reclamation>> getReclamationsAssignedToUser(@PathVariable Long userId) {
        List<Reclamation> reclamations = reclamationService.getReclamationsAssignedToUser(userId);
        return new ResponseEntity<>(reclamations, HttpStatus.OK);
    }


    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody Reclamation reclamation) {
        // Trigger the sendNotification method in the service layer
        reclamationService.sendNotification(reclamation, "CREATE");
        return ResponseEntity.ok("Notification sent successfully!");
    }
    @PostMapping("/send-notifications")
    public String sendNotifications() {
        reclamationService.checkAndSendNotifications();
        return "Notifications sent successfully!";
    }

}

