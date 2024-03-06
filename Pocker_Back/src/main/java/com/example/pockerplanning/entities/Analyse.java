package com.example.pockerplanning.entities;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
=======
>>>>>>> f63b69fb615c7369c9e19c572f91cbb40c7d464c
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Analyse implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String Description;
    private Date date_analyse;
@JsonIgnore
    @OneToOne
    private Ticket ticket   ;


    @OneToOne
    private Projet projet;


    // Ticket ticket;
      //  Sprint sprint;
    //User user;


   // List<Session> sessions;
    //  Sprint sprint;
    //User user;


    // List<Session> sessions;
}

