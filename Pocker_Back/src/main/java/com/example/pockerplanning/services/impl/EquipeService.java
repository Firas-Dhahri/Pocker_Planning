package com.example.pockerplanning.services.impl;

import com.example.pockerplanning.entities.Equipe;
import com.example.pockerplanning.entities.User;
import com.example.pockerplanning.repository.EquipeRepository;
import com.example.pockerplanning.repository.UserRepository;
import com.example.pockerplanning.services.Interface.IEquipeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class EquipeService implements IEquipeService {

    @Autowired
    private EquipeRepository equipeRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Equipe> getAllEquipes() {
        return equipeRepository.findAll();
    }

    public Optional<Equipe> getEquipeById(Long id) {
        return equipeRepository.findById(id);
    }

    public Equipe createEquipe(Equipe equipe) {
        return equipeRepository.save(equipe);
    }

    public Equipe updateEquipe(int id, Equipe equipe) {
        equipe.setId(id);
        return equipeRepository.save(equipe);
    }

    public void deleteEquipe(Long id) {
        equipeRepository.deleteById(id);
    }

    @Override
    public Equipe affecterUtilisateurs(Long equipeId, List<Integer> userIds) {
        // Récupérer l'équipe depuis la base de données
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new NotFoundException("Équipe non trouvée avec l'ID : " + equipeId));

        // Récupérer les utilisateurs depuis la base de données
        List<User> users = userRepository.findAllById(userIds);

        // Affecter les utilisateurs à l'équipe
        equipe.setUsers(new HashSet<>(users));

        // Sauvegarder les modifications dans la base de données
        return equipeRepository.save(equipe);
    }
    public List<User> searchMembersByCriteriaInTeam(String equipeId, String criteria) {
        // Implémentez la logique de recherche en utilisant le critère spécifié dans l'équipe donnée
        return equipeRepository.findMembersByCriteriaInTeam(equipeId, criteria);
    }
    @Override
    @Transactional
    public void removeUserFromEquipe(Integer userId, Long equipeId) {
        Optional<Equipe> equipeOptional = equipeRepository.findById(equipeId);
        if (equipeOptional.isPresent()) {
            Equipe equipe = equipeOptional.get();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                equipe.removeUser(user);
                equipeRepository.save(equipe);
            } else {
                throw new NotFoundException("User not found with id: " + userId);
            }
        } else {
            throw new NotFoundException("Equipe not found with id: " + equipeId);
        }

    }
    @Override
    public void evaluateSatisfactionSM(Long equipeId, int satisfactionSM) {
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new NotFoundException("Equipe not found with id: " + equipeId));
        equipe.setSatisfactionSM(satisfactionSM);
        equipeRepository.save(equipe);
    }

    @Override
    public void evaluateSatisfactionPO(Long equipeId, int satisfactionPO) {
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new NotFoundException("Equipe not found with id: " + equipeId));
        equipe.setSatisfactionPO(satisfactionPO);
        equipeRepository.save(equipe);
    }
}

