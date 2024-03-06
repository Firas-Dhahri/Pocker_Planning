package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Session;
import com.example.pockerplanning.services.impl.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/session")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
public class SessionController {
    @Autowired
    private SessionService sessionService ;

   @PostMapping("/AddSession")
    public Session addSession(@RequestBody Session session) {

            return sessionService.addSession2(session);


   }

    @MessageMapping("/sendSessionId")
    @SendTo("/topic/session")
    public String handleSessionId(@Payload Session sessionId) {
        // Process the session ID
        System.out.println("Received session ID: " + sessionId);

        return this.sessionService.getRemainingTimeForSession((long) sessionId.getId());
    }
    @MessageMapping("/createSession")
    public void handleCreateSession(@Payload Session session) {
        System.out.println("Received session: " + session);
        try {
            sessionService.addSession2(session);
            System.out.println("Session added successfully");
        } catch (Exception e) {
            System.err.println("Error adding session: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @PutMapping("/UpdateEndDate/{idsession}")
    public ResponseEntity<?> UpdateSession(@PathVariable Long idsession) {
        try {
            return sessionService.updateEndDate(idsession);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update session: " + e.getMessage());
        }
    }
    @MessageMapping("/update")
    @SendTo("/topic/session")
    public Session updateStartDate(@PathVariable Long idsession) {

            return sessionService.updateStartDate(idsession);

    }

  @PutMapping("/update/{idsession}")
    public Session updateStartDatehttp(@PathVariable Long idsession) {

        return sessionService.updateStartDate(idsession);

    }

    @PutMapping("/updateFalse/{idsession}")
    public Session updateStartDateFalse(@PathVariable Long idsession) {

        return sessionService.updateStartDateFalse(idsession);

    }

    @GetMapping("/getbyid")
    public Session getby(){
       return sessionService.getbyid() ;
    }

    @GetMapping("/remaining-time/{id}")
    public ResponseEntity<?> getRemainingTimeForSession(@PathVariable Long id) {
        try {
            String remainingTime = sessionService.getRemainingTimeForSession(id);
            String[] parts = remainingTime.split(":");
            int hours = Integer.parseInt(parts[0]);
            int minutes = Integer.parseInt(parts[1]);
            int seconds = Integer.parseInt(parts[2]);

            Map<String, Integer> remainingTimeMap = new HashMap<>();
            remainingTimeMap.put("hours", hours);
            remainingTimeMap.put("minutes", minutes);
            remainingTimeMap.put("seconds", seconds);

            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(remainingTimeMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }



}
