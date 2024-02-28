package com.example.pockerplanning.services.impl;


import com.example.pockerplanning.dto.ListTicketResponseDto;
import com.example.pockerplanning.dto.TicketCreationDto;
import com.example.pockerplanning.dto.TicketGetDto;
import com.example.pockerplanning.dto.config.TicketMapper;
import com.example.pockerplanning.entities.Ticket;
import com.example.pockerplanning.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import com.example.pockerplanning.services.Interface.ITicketService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService implements ITicketService {
  /*  @Autowired
    TicketRepository ticketRepository;
    @Autowired
    TicketMapper ticketMapper;


    @Value("${nom.de.utlisateur}")
    private String username;

    @Value("${api.token}")
    private String password;
    //private String domain= "firasdhahri";
    @Value("${domain.name}")
    private String domain;

    //private String projectKey = "SALAM";
    private String projectLead = "712020:286e61dc-4de8-4dd8-b55c-daee6fd45fb4";
    //@Autowired
    //private SprintRepository sprintRepository;

    @Override
    public List<Ticket> getallticekts() {
        List<Ticket> tickets = new ArrayList<>();
        try {
            String baseUrl = "https://" + domain + ".atlassian.net/rest/api/2/search";
            String auth = username + ":" + password;
            byte[] authBytes = auth.getBytes();
            String base64Creds = java.util.Base64.getEncoder().encodeToString(authBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("Authorization", "Basic " + base64Creds);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<ListTicketResponseDto> response = restTemplate.exchange(baseUrl, HttpMethod.GET, entity, ListTicketResponseDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                ListTicketResponseDto listTicketResponseDto = response.getBody();

                if (listTicketResponseDto != null) {
                    List<Ticket> fetchedTickets = listTicketResponseDto.getIssues();
                    for (Ticket ticket : fetchedTickets) {
                        // Check if the ticket already exists in the database based on its key
                        boolean exists = ticketRepository.existsByKey(ticket.getKey());
                        if (!exists) {
                            // If the ticket doesn't exist, save it
                            ticketRepository.save(ticket);
                        } else {
                            // If the ticket already exists, you can choose to update it or ignore it
                            // For now, let's just print a message
                            System.out.println("Ticket with key " + ticket.getKey() + " already exists in the database.");
                        }
                    }
                    tickets.addAll(fetchedTickets); // Add all fetched tickets to the list
                } else {
                    System.out.println("Response body is null");
                }
            } else {
                System.out.println("Failed to retrieve issues. Status code: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return tickets;
    }

    public TicketGetDto getTicektById(String key) {
//        List<Ticket> tickets = new ArrayList<>();
        try {
            String baseUrl = "https://" + domain + ".atlassian.net/rest/api/2/issue/" + key;
            String auth = username + ":" + password;
            byte[] authBytes = auth.getBytes();
            String base64Creds = java.util.Base64.getEncoder().encodeToString(authBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("Authorization", "Basic " + base64Creds);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<TicketGetDto> response = restTemplate.exchange(baseUrl, HttpMethod.GET, entity, TicketGetDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                TicketGetDto ticketResponseDto = response.getBody();

                if (ticketResponseDto != null) {
                    return ticketResponseDto;
                } else {
                    System.out.println("Response body is null");
                }
            } else {
                System.out.println("Failed to retrieve issues. Status code: " + response.getStatusCodeValue());
            }
        } catch (
                Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }


    @Override
    public TicketGetDto createIssue(TicketCreationDto ticketCreationDto) {
        try {
            String baseUrl = "https://" + domain + ".atlassian.net/rest/api/2/issue";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(username, password);
            // sprintname = ticketRepository.findTicketBySprints(name)
            String requestBody = "{\"fields\": {" +
                    "\"project\": {\"key\": \"" + ticketCreationDto.getKey() + "\"}," +
                    "\"summary\": \"" + ticketCreationDto.getFields().getSummary() + "\"," +
                    "\"description\": \"" + ticketCreationDto.getFields().getDescription() + "\"," +
                    "\"issuetype\": {\"name\": \"" + ticketCreationDto.getFields().getIssuetype().getName() + "\"}" +
                    "}}";
            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Ticket> response = restTemplate.exchange(baseUrl, HttpMethod.POST, requestEntity, Ticket.class);
            if (response.getStatusCode() == HttpStatus.CREATED) {
                Ticket createdIssue = response.getBody();
                final String keyToFind = createdIssue.getKey();
                Optional<Ticket> optionalTicket = getallticekts().stream()
                        .filter(ticket -> ticket.getKey().equals(keyToFind))
                        .findFirst();
                if (optionalTicket.isPresent()) {
                    //Ticket ticket = ticketMapper.toEntityFromGet(createdIssue);
//                    createdIssue = ticketRepository.save(createdIssue);
//                    return ticketMapper.toDto(createdIssue);
                    Ticket savedTicked = ticketRepository.save(optionalTicket.get());
                    TicketGetDto ticketGetDto = ticketMapper.toDto(savedTicked);
                    return ticketGetDto;
                } else {
                    System.out.println("Created issue response body is null");
                }
            } else {
                System.out.println("Failed to create issue. Status code: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            System.out.println("Error creating issue: " + e.getMessage());
        }
        return null;
    }
    @Transactional
    @Override
    public TicketGetDto updateIssueByKey(String issueKey, TicketCreationDto ticketCreationDto) {
        try {
            String baseUrl = "https://" + domain + ".atlassian.net/rest/api/2/issue/" + issueKey;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(username, password);

            String requestBody = "{\"fields\":{" +
                    "\"summary\":\"" + ticketCreationDto.getFields().getSummary() + "\"," +
                    "\"description\":\"" + ticketCreationDto.getFields().getDescription() + "\"," +
                    "\"issuetype\":{\"name\":\"" + ticketCreationDto.getFields().getIssuetype().getName() + "\"}," +
                    "\"customfield_10016\":" + ticketCreationDto.getFields().getCustomfield_10016() +
                    "}}";
            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Ticket> response = restTemplate.exchange(baseUrl, HttpMethod.PUT, requestEntity, Ticket.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                // Update existing ticket with new data
                Optional<Ticket> optionalTicket = getallticekts().stream()
                        .filter(ticket -> ticket.getKey().equals(issueKey))
                        .findFirst();
                if (optionalTicket.isPresent()) {
                    Ticket existingTicket = optionalTicket.get();
                    // Accessing the Fields object within Ticket
                    Ticket.Fields existingFields = existingTicket.getFields();

                    // Update fields with new data
                    existingFields.setSummary(ticketCreationDto.getFields().getSummary());
                    existingFields.setDescription(ticketCreationDto.getFields().getDescription());

                    // Save the updated ticket back to the database
                    Ticket savedTicked = ticketRepository.save(existingTicket);
                    TicketGetDto ticketGetDto = ticketMapper.toDto(savedTicked);
                    return ticketGetDto;
                } else {
                    System.out.println("Failed to find existing issue with key: " + issueKey);
                }
            } else {
                System.out.println("Failed to update issue. Status code: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            System.out.println("Error updating issue: " + e.getMessage());
        }
        return null;
    }




    @Override
    public String createProject(String projectKey, String projectName) {
        try {
            String baseUrl = "https://" + domain + ".atlassian.net/rest/api/3/project";
            String auth = username + ":" + password;
            byte[] authBytes = auth.getBytes();
            String base64Creds = java.util.Base64.getEncoder().encodeToString(authBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("Authorization", "Basic " + base64Creds);

            String requestBody = "{\"key\": \"" + projectKey + "\", " +
                    "\"name\": \"" + projectName + "\", " +
                    "\"projectTypeKey\": \"software\"," +
                    "\"leadAccountId\": \"" + projectLead + "\"}";

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode() == HttpStatus.CREATED) {
                return projectKey; // Assuming project key is returned upon successful creation
            } else {
                System.out.println("Failed to create project. Status code: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            System.out.println("Error creating project: " + e.getMessage());
        }
        return null;
    }



    @Override
    public boolean deleteIssue(String issueKey) {
        try {
            String baseUrl = "https://" + domain + ".atlassian.net/rest/api/2/issue/" + issueKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(username, password);

            HttpEntity<String> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Void> response = restTemplate.exchange(baseUrl, HttpMethod.DELETE, requestEntity, Void.class);

            if (response.getStatusCode() == HttpStatus.NO_CONTENT) {
                return true; // Issue deleted successfully
            } else {
                System.out.println("Failed to delete issue. Status code: " + response.getStatusCodeValue());
            }
        } catch (Exception e) {
            System.out.println("Error deleting issue: " + e.getMessage());
        }
        return false;
    }



  *//*  @Override
    @Transactional
    public void affectTicketsToSprint(long sprintId, List<Long> ticketIds) {
        Optional<Sprint> optionalSprint = sprintRepository.findById(sprintId);
        if (optionalSprint.isEmpty()) {
            throw new IllegalArgumentException("Sprint with ID " + sprintId + " not found.");
        }
        Sprint sprint = optionalSprint.get();

        List<Ticket> tickets = ticketRepository.findAllById(ticketIds);
        for (Ticket ticket : tickets) {
            ticket.setSprint(sprint);
            ticketRepository.save(ticket);

        }
    }
*/
}





