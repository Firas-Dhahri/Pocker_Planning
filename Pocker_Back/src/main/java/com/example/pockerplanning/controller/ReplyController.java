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

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/chat.sendReply")
    public void saveReply(@Payload ReplyPayload replyPayload, @Payload Reply reply) {
        Message message = messageRepository.findById(replyPayload.getId()).orElse(null);

        if (message != null) {
            String fromSender = reply.getFromSender();
            String toReciever = reply.getToReciever();

            Reply replyObj = replyPayload.getReply();
            replyObj.setMessage(message);
            replyObj.setFromSender(fromSender);
            replyObj.setToReciever(toReciever);

            Reply savedReply = replyRepository.save(replyObj);

            messagingTemplate.convertAndSend("/topic/public", savedReply);
        }
    }
}
