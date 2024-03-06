package com.example.pockerplanning.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link Ticket}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketCreationDto implements Serializable {
    private String key;
    private FieldsDto fields;
    private String self;


    /**
     * DTO for {@link Ticket.Fields}
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FieldsDto implements Serializable {
        String summary;
        Float customfield_10016;
        IssuetypeDto issuetype;
        String description;
        PriorityDto priority;


        /**
         * DTO for {@link Ticket.Fields.Issuetype}
         */

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class IssuetypeDto implements Serializable {
            String name;

        }

        /**
         * DTO for {@link Ticket.Priority}
         */
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class PriorityDto implements Serializable {
            String name;
        }
    }
}