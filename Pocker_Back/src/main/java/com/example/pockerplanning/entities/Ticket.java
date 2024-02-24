package com.example.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Ticket")
public class Ticket implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idticket")
    private Long id;
    @Column(name = "self_ticket")
    private String self;
    private String key;
    @Embedded
    private Fields fields;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sprint_id_sprint")
    private Sprint sprint;


    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Fields {

        private String summary;
        private Float customfield_10016;
        @Embedded
        private Issuetype issuetype;
        @Column(name = "description_field")
        private String description;
        @Embedded
        private Priority priority;
        private String created;
        private String updated;


        @Data
        @Embeddable
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Issuetype {
            private String id;
            private String self;
            private String description;
            private String name;
        }
    }
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Priority {
        @Column(name = "priority_name") // Unique column name for Priority name
        private String name;
    }

    public void setSprint(Sprint sprint) {
    }
}