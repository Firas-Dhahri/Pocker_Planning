package com.example.pockerplanning.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@ToString
@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Equipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom_equipe;
    private String Description_Equipe;
    private int satisfactionSM;
    private int satisfactionPO;
    private String chat;
    private DISPONIBILITE disponibilites;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="equipe")
    private List<Projet> Projets;

    @ManyToMany(mappedBy="equipes", cascade = CascadeType.ALL)
    private List<User> users;
}