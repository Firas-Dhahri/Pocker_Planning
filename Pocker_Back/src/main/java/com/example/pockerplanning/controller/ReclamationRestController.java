package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.*;
import com.example.pockerplanning.services.impl.ImageTextExtractionService;
import com.example.pockerplanning.services.impl.ReclamationService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reclamations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReclamationRestController {
    @Autowired
    private final ImageTextExtractionService imageTextExtractionService;

    @Autowired
    private ReclamationService reclamationService;

    public ReclamationRestController(ImageTextExtractionService imageTextExtractionService) {
        this.imageTextExtractionService = imageTextExtractionService;
    }


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
    public ResponseEntity<Reclamation> createReclamation(
            @RequestParam("utilisateurId") Long utilisateurId,
            @RequestParam("description") String description,
            @RequestParam("type") TypeReclamation type,
            @RequestParam("priorite") Priorite priorite,
            @RequestParam("statut") Statut statut,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            // Save the file to the server or process it as needed
            String filePath = saveFile(file);

            // Create a Reclamation object
            Reclamation reclamation = new Reclamation();
            reclamation.setUtilisateurId(utilisateurId);
            reclamation.setDescription(description);
            reclamation.setType(type);
            reclamation.setPriorite(priorite);
            reclamation.setStatut(statut);
            reclamation.setPieceJointe(filePath);

            // Save the reclamation object to the database
            Reclamation createdReclamation = reclamationService.createReclamation(reclamation);

            return ResponseEntity.ok(createdReclamation);
        } catch (IOException e) {
            // Handle file processing exception
            return ResponseEntity.status(500).build();
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Define the directory where you want to save the file
        String uploadDir = "C:\\Users\\chedli\\Desktop\\Pocker_Planninggit\\Pocker_Front\\src\\assets\\images\\reclamation";

        // Create the directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // Create directory including any necessary but nonexistent parent directories
        }

        // Generate a unique file name to prevent conflicts
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = System.currentTimeMillis() + "-" + fileName;

        // Set the file path where the uploaded file will be saved
        Path filePath = Paths.get(uploadDir, uniqueFileName);

        // Copy the uploaded file to the destination directory
        Files.copy(file.getInputStream(), filePath);

        // Return the file path
        return uploadDir + "/" + uniqueFileName;
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


    @GetMapping("/send-notifications")
    public ResponseEntity<String> sendNotifications() {
        try {
            reclamationService.checkAndSendNotifications();
            return ResponseEntity.ok("Notifications sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending notifications: " + e.getMessage());
        }
    }
    @PostMapping("/extractText")
    public ResponseEntity<String> extractTextFromImage(@RequestParam("imageFile") MultipartFile imageFile) {
        try {
            String extractedText = imageTextExtractionService.extractTextFromImage(imageFile);
            return ResponseEntity.ok(extractedText);
        } catch (IOException | TesseractException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error extracting text from image.");
        }
    }

    @PostMapping("/extractBlueText")
    public ResponseEntity<String> extractBlueTextFromImage(@RequestParam("imageFile") MultipartFile imageFile) {
        try {
            String extractedText = imageTextExtractionService.extractBlueTextFromImage(imageFile);
            return ResponseEntity.ok(extractedText);
        } catch (IOException | TesseractException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error extracting blue text from image.");
        }

    }
    @GetMapping("/filtered")
    public ResponseEntity<List<Reclamation>> getFilteredReclamations(@RequestParam(required = false) String statut,
                                                                     @RequestParam(required = false) String priority,
                                                                     @RequestParam(required = false) String type) {
        List<Reclamation> filteredReclamations = reclamationService.getFilteredReclamations(statut, priority, type);
        return new ResponseEntity<>(filteredReclamations, HttpStatus.OK);
    }
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return reclamationService.getUserById(id);
    }
}

