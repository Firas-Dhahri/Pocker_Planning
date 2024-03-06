package com.example.pockerplanning.dto;

import com.example.pockerplanning.entities.Ticket;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ListTicketResponseDto {
    private List<Ticket> issues;

    public List<Ticket> getIssues() {
        return issues;
    }

    public void setIssues(List<Ticket> issues) {
        this.issues = issues;
    }


}