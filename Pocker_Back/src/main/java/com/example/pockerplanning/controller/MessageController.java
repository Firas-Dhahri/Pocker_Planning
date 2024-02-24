package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Message;
import com.example.pockerplanning.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    private final MessageRepository messageRepository;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    public MessageController(MessageRepository messageRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.messageRepository = messageRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload Message message) {
        message.setDateTime(new Date());
        messageRepository.save(message);
        simpMessagingTemplate.convertAndSend("/topic/public", message);
    }

    @MessageMapping("/chat.updateMessage")
    @SendTo("/topic/public")
    public Message updateMessage(Message updatedMessage) {
        Message existingMessage = messageRepository.findById(updatedMessage.getId()).orElse(null);
        if (existingMessage != null) {
            existingMessage.setContent(updatedMessage.getContent());
            existingMessage.setDateTime(new Date());
            messageRepository.save(existingMessage);
            // Créer un nouvel objet JSON représentant uniquement le nouveau message mis à jour
            return new Message(updatedMessage.getId(), updatedMessage.getContent(), updatedMessage.getSender(), existingMessage.getDateTime());
        } else {
            return null;
        }
    }

}
