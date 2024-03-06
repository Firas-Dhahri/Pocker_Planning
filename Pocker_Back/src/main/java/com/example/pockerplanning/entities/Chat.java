package com.example.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private boolean isActive;
  //changed relationship
    @ManyToOne
    @JoinColumn(name="session_id")
    private Session sessionC ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="chat")
    private List<Message> Messages;


}
