package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.Session;
import com.example.pockerplanning.repository.SessionRepositery;
import com.example.pockerplanning.services.Interface.ISessionService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService implements ISessionService {
    @Autowired
    private SessionRepositery sessionRepository ;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;




      public SessionService(){}


   public Session addSession2(Session session) {
           LocalDateTime now = LocalDateTime.now();
           LocalDateTime sessionStartDate = now.plus(30, ChronoUnit.MINUTES);
           session.setStartDate(sessionStartDate);

           Session createdSession = sessionRepository.save(session);

   messagingTemplate.convertAndSend("/topic/session", createdSession);
           sendSessionAddedEmail(session);

       messagingTemplate.convertAndSend("/topic/session", createdSession);
        return  createdSession ;

   }

    private void sendMessageToTopic(String message) {

        messagingTemplate.convertAndSend("/topic/session",message);
    }





    public ResponseEntity<?> updateEndDate( Long id) {
        Session session = sessionRepository.findById(id).orElse(null);

        if (session != null) {
            try {
                session.setEnddate(LocalDateTime.now());
                sessionRepository.saveAndFlush(session);
                return ResponseEntity.ok(session);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to update session: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Session not found with id: " + id);
        }
    }




    public Session updateStartDate(Long id) {
        Session session = sessionRepository.findById(id).orElse(null);

                session.setVotingStarted(true);
                sessionRepository.saveAndFlush(session);
                sendMessageToTopic("sayee mel spring boot");
                messagingTemplate.convertAndSend("/topic/session" ,session);
              return session ;

    }

    public Session updateStartDateFalse(Long id) {
        Session session = sessionRepository.findById(id).orElse(null);

        session.setVotingStarted(false);
        sessionRepository.saveAndFlush(session);
        sendMessageToTopic("sayee mel spring boot");
        messagingTemplate.convertAndSend("/topic/session" ,session);
        return session ;

    }



    public void sendSessionAddedEmail(Session session) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setFrom(new InternetAddress("pokerplaning0@gmail.com"));
            String[] recipients = { "wiem.khedri50@gmail.com"};
            helper.setTo(recipients);
            helper.setSubject("New Session Added");


            String htmlContent = "<p>A new session has been added.</p>"
                    + "<p>We Have A New Session after 30 Minute:</p>"
                    + "<p>Please confirm your presence:</p>" ;


            helper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public String getRemainingTimeForSession(Long id) {
        Optional<Session> optionalSession = sessionRepository.findById(id);
        if (optionalSession.isPresent()) {
            Session session = optionalSession.get();
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime sessionStartDate = session.getStartDate();
            if (sessionStartDate.isAfter(now)) {
                Duration duration = Duration.between(now, sessionStartDate);
                long seconds = duration.getSeconds();
                long absSeconds = Math.abs(seconds);
                long hours = absSeconds / 3600;
                long minutes = (absSeconds % 3600) / 60;
                long secs = absSeconds % 60;

                return String.format("%02d:%02d:%02d", hours, minutes, secs);
            } else {
                return "00:00:00";
            }
        } else {
            return "Session not found";
        }
    }


    public Session addsession(){
        Session session = new Session() ;
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sessionStartDate = now.plus(30, ChronoUnit.MINUTES);
        session.setStartDate(sessionStartDate);
        this.sessionRepository.save(session) ;

       return   session;

    }
    public Session getbyid(){
          Session s = sessionRepository.findById(77L).orElse(null) ;

          return s ;
    }


}

