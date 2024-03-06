package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Message;
import com.example.pockerplanning.entities.Reply;
import com.example.pockerplanning.entities.ReplyPayload;
import com.example.pockerplanning.repository.MessageRepository;
import com.example.pockerplanning.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReplyController {

    private final ReplyRepository replyRepository;
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    MessageRepository messageRepository ;

    @Autowired
    public ReplyController(ReplyRepository replyRepository, SimpMessagingTemplate messagingTemplate) {
        this.replyRepository = replyRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendReply")
    public void saveReply(@Payload ReplyPayload reply ) {
        Message m = messageRepository.findById(reply.getId()).orElse(null) ;
        reply.getReply().setMessage(m);
        Reply savedReply = replyRepository.save(reply.getReply());
        messagingTemplate.convertAndSend("/topic/public", savedReply);
    }

}
