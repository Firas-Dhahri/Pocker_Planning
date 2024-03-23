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
    public void saveReply(@Payload ReplyPayload reply, @Payload Reply r) {
        Message message = messageRepository.findById(reply.getId()).orElse(null);

        if (message != null) {
            String sender = r.getSender();

            Reply replyObj = reply.getReply();

            replyObj.setMessage(message);

            replyObj.setSender(sender);

            Reply savedReply = replyRepository.save(replyObj);

            messagingTemplate.convertAndSend("/topic/public", savedReply);
        }
    }

}
