package com.example.pockerplanning.services.Interface;

import com.example.pockerplanning.entities.Equipe;
import com.example.pockerplanning.entities.User;

import java.util.List;
import java.util.Optional;

public interface IEquipeService {

    List<Equipe> getAllEquipes();

    Optional<Equipe> getEquipeById(Long id);

    Equipe createEquipe(Equipe equipe);

    Equipe updateEquipe(int id, Equipe equipe);

    void deleteEquipe(Long id);
    Equipe affecterUtilisateurs(Long equipeId, List<Integer> userIds);
    void removeUserFromEquipe(Integer userId, Long equipeId);
    List<User> searchMembersByCriteriaInTeam(String equipeId, String criteria);
    void evaluateSatisfactionSM(Long equipeId, int satisfactionSM);
    void evaluateSatisfactionPO(Long equipeId, int satisfactionPO);
}

