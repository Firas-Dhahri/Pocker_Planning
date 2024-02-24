package com.example.pockerplanning.dto.config;

import com.example.pockerplanning.dto.TicketCreationDto;
import com.example.pockerplanning.dto.TicketGetDto;
import com.example.pockerplanning.entities.Ticket;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class TicketMapper {
    private final ModelMapper modelMapper;

    public TicketMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    //Ticket to ticket get dto
    public TicketGetDto toDto(Ticket ticket) {
        return modelMapper.map(ticket, TicketGetDto.class);
    }

    //Creattion Dto To entity
    public Ticket toEntityFromCreation(TicketCreationDto ticketCreationDto) {
        return modelMapper.map(ticketCreationDto, Ticket.class);
    }
    public Ticket toEntityFromGet(TicketGetDto ticketGetDto) {
        return modelMapper.map(ticketGetDto, Ticket.class);
    }

    //TicketList to getDTOList
    public List<TicketGetDto> toDtoList(List<Ticket> meetings) {
        return meetings.stream()
                .map(this::toDto)
                .collect(toList());
    }
}
