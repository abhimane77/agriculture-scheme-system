package com.agriculture.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "farmers")
public class Farmer {

    @Id
    private String id;

    // Basic details
    private String name;
    private String email;
    private String mobile;
    private String password;

    // 🌾 FARMER PROFILE (USED FOR RECOMMENDATION)
    private String state;        // Maharashtra, Punjab, etc.
    private Double landSize;     // in acres/hectares
    private Double income;       // yearly income
    private String cropType;     // Rice, Wheat, Cotton
    private String category;     // SC, ST, OBC, GENERAL

    // 🔐 SECURITY
    private boolean verified;
    private String role;         // ROLE_FARMER
}