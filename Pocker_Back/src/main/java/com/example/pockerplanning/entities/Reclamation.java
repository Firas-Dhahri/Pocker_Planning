package com.example.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor

public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long utilisateurId;
    private String description;
    @Enumerated(EnumType.STRING)
    private TypeReclamation type;
    @Enumerated(EnumType.STRING)
    private Priorite priorite;
    @Enumerated(EnumType.STRING)
    private Statut statut;
    private String pieceJointe;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_soumission", nullable = false, updatable = false)
    private Date dateSoumission;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateMiseAJour;
    private Long utilisateurTraitantId;
    @ManyToOne
    Projet projet;
}
