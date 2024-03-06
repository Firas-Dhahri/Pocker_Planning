package com.example.pockerplanning.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Sprint")
public class Sprint implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSprint")
    private long id;
    private String self;
    private String state;
    private String name;
    private String startDate;
    private String endDate;
    private String createdDate;
    private long originBoardId;
    private String goal;

    private Date real_end_date;
    @JsonIgnore
    @ManyToOne
    Projet projet;
    @JsonIgnore
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "sprint")
    private Set<Ticket> Tickets;



}