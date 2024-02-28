package com.example.pockerplanning;

import com.example.pockerplanning.services.Interface.IReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync(proxyTargetClass=true)
public class PockerplanningApplication {
    @Autowired
    private IReclamationService reclamationService;

    public static void main(String[] args) {
        SpringApplication.run(PockerplanningApplication.class, args);
    }

}
