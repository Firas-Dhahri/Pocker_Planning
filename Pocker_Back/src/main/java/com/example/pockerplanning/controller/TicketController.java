package com.example.pockerplanning.controller;

import com.example.pockerplanning.dto.TicketCreationDto;
import com.example.pockerplanning.dto.TicketGetDto;
import com.example.pockerplanning.entities.Ticket;
import com.example.pockerplanning.services.impl.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/ticket")
@CrossOrigin(origins = "http://localhost:4200/")

@RestController
public class TicketController {
    /*@Autowired
    TicketService ticketService;

    *//*@PostMapping("/ajouterticekt")
    public Ticket ajouterticket(@RequestBody Ticket ticket) {
        Ticket tick = ticketService.ajouterticket(ticket);
        return tick;

    }*//*
    @GetMapping("/afficherlestickets")
    public List<Ticket> afficherTicket() {
        return ticketService.getallticekts();
    }
    @GetMapping("/afficherlestickets/{key}")
    public TicketGetDto afficherTicketbykey(@PathVariable String key) {

        return ticketService.getTicektById(key);
    }

    *//*@PostMapping("/AjouterTicket")
    public Ticket createIssue(@RequestParam String key,
                              @RequestParam String issueType,
                              @RequestParam String summary,
                              @RequestParam String description) {
        return ticketService.addIssue(key ,issueType, summary, description);
    }*//*
    @PostMapping("/createIssue")
    public ResponseEntity<TicketGetDto> createIssue(@RequestBody TicketCreationDto ticketCreationDto) {
        TicketGetDto createdIssue = ticketService.createIssue(ticketCreationDto);
        if (createdIssue != null) {
            return new ResponseEntity<>(createdIssue, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{issueKey}")
    public TicketGetDto updateTicket(@PathVariable String issueKey , @RequestBody  TicketCreationDto ticketCreationDto ) {
        return ticketService.updateIssueByKey(issueKey, ticketCreationDto);
    }


    @PostMapping("/createproj")
    public ResponseEntity<String> createProject(@RequestParam String projectName,
                                                @RequestParam String projectKey ) {
        String project = ticketService.createProject( projectKey,projectName);
        if (project != null) {
            return new ResponseEntity<>("Project created with key: " + projectKey, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create project", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/delete/{issueKey}")
    public ResponseEntity<String> deleteIssue(@PathVariable String issueKey) {
        boolean deleted = ticketService.deleteIssue(issueKey);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete issue with key " + issueKey + ".");
        }
    }*/
}

