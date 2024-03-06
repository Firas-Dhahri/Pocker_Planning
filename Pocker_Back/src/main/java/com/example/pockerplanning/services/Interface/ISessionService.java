package com.example.pockerplanning.services.Interface;


import com.example.pockerplanning.Dto.SessionDTO;
import com.example.pockerplanning.entities.Session;
import org.springframework.http.ResponseEntity;

import java.time.Duration;

public interface ISessionService {
    public Session addSession2(Session session);
    public ResponseEntity<?> updateEndDate( Long id) ;
    public Session updateStartDate( Long id) ;

    public void sendSessionAddedEmail(Session session) ;
    public String getRemainingTimeForSession(Long id);
}
