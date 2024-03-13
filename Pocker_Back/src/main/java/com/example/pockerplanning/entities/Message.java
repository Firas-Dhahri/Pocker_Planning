package com.example.pockerplanning.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "sender")
    private String sender;

    @Column(name = "dateTime")
    private Date dateTime;

    @Column(name = "isActive")
    private Boolean isActive;

    private Long technology;
    private Long effort;
    private Long codeComplexity;
    private Long dependencies;

    @JsonIgnore
    @ManyToOne
    private Session sessionC;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "message")
    private List<Metric> metrics;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "message")
    private List<Reply> replies;

    public Message(Long id, String content, String sender, Date dateTime) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.dateTime = dateTime;
    }

}



