package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Message;
import com.example.pockerplanning.entities.Metric;
import com.example.pockerplanning.repository.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class MessageController {

    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessageController(MessageRepository messageRepository, SimpMessagingTemplate messagingTemplate) {
        this.messageRepository = messageRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload Message message) {
        if (message.getContent() != null && !message.getContent().isEmpty()) {
            message.setDateTime(new Date());
            addMetricsToMessage(message);
            messageRepository.save(message);
            messagingTemplate.convertAndSend("/topic/public", message);
        }
    }

    private void addMetricsToMessage(Message message) {
        if (message.getMetrics() == null) {
            message.setMetrics(new ArrayList<>());
        }
    }

}