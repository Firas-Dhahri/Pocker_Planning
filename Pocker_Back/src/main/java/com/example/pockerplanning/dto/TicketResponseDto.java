package com.example.pockerplanning.dto;

import com.example.pockerplanning.entities.Ticket;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class TicketResponseDto {
    private Ticket issues;




}