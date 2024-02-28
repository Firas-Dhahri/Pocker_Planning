package com.example.pockerplanning.controller;

import com.example.pockerplanning.entities.Equipe;
import com.example.pockerplanning.entities.User;
import com.example.pockerplanning.services.Interface.IEquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipes")
public class EquipeRestController {

    @Autowired
    private IEquipeService equipeService;

    @GetMapping
    public ResponseEntity<List<Equipe>> getAllEquipes() {
        List<Equipe> equipes = equipeService.getAllEquipes();
        return new ResponseEntity<>(equipes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipe> getEquipeById(@PathVariable Long id) {
        Optional<Equipe> equipe = equipeService.getEquipeById(id);
        return equipe.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Equipe> createEquipe(@RequestBody Equipe equipe) {
        Equipe createdEquipe = equipeService.createEquipe(equipe);
        return new ResponseEntity<>(createdEquipe, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipe> updateEquipe(@PathVariable int id, @RequestBody Equipe equipe) {
        Equipe updatedEquipe = equipeService.updateEquipe(id, equipe);
        return new ResponseEntity<>(updatedEquipe, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipe(@PathVariable Long id) {
        equipeService.deleteEquipe(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{equipeId}/affecter-utilisateurs")
    public ResponseEntity<Equipe> affecterUtilisateursAEquipe(@PathVariable Long equipeId, @RequestBody List<Integer> userIds) {
        Equipe equipe = equipeService.affecterUtilisateurs(equipeId, userIds);
        return ResponseEntity.ok().body(equipe);
    }
    @DeleteMapping("/{equipeId}/users/{userId}")
    public ResponseEntity<String> removeUserFromEquipe(@PathVariable Long equipeId, @PathVariable Integer userId) {
        equipeService.removeUserFromEquipe(userId, equipeId);
        return ResponseEntity.ok("User removed from equipe successfully");
    }
    @GetMapping("/{equipeId}/members/search")
    public ResponseEntity<List<User>> searchMembersInTeam(@PathVariable String equipeId, @RequestParam String criteria) {
        List<User> members = equipeService.searchMembersByCriteriaInTeam(equipeId, criteria);
        return ResponseEntity.ok(members);
    }
    @PutMapping("/sm/{equipeId}")
    public ResponseEntity<String> evaluateSatisfactionSM(@PathVariable Long equipeId, @RequestParam int satisfactionSM) {
        equipeService.evaluateSatisfactionSM(equipeId, satisfactionSM);
        return ResponseEntity.ok("Satisfaction SM evaluated successfully for equipeId: " + equipeId);
    }

    @PutMapping("/po/{equipeId}")
    public ResponseEntity<String> evaluateSatisfactionPO(@PathVariable Long equipeId, @RequestParam int satisfactionPO) {
        equipeService.evaluateSatisfactionPO(equipeId, satisfactionPO);
        return ResponseEntity.ok("Satisfaction PO evaluated successfully for equipeId: " + equipeId);
    }
}
