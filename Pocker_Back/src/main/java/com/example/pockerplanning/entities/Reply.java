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
@ToString
@Table(name = "Reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    @Column(name = "content")
    private String content;

    @Column(name = "fromSender")
    private String fromSender;

    @Column(name = "toReciever")
    private String toReciever;

    @Column(name = "dateTime")
    private Date dateTime;

}
