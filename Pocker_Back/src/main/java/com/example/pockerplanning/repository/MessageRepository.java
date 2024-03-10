package com.example.pockerplanning.repository;

import com.example.pockerplanning.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    enum TypeReclamation {
        BUG,
        AMELIORATION,
        DEMANDE_FONCTIONNALITE,
        ASSISTANCE,
        QUESTION,
        FEEDBACK_UTILISATEUR,
        RAPPORT_SECURITE,
        ABUS_SPAM,
        FACTURATION_PAIEMENT,
        INACCESSIBILITE
    }
}