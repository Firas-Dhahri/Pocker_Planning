package com.example.pockerplanning.entities;

public class ReplyPayload {
    private Long id;
    private Reply reply;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reply getReply() {
        return reply;
    }

    public void setReply(Reply reply) {
        this.reply = reply;
    }
}