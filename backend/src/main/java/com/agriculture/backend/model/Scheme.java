package com.agriculture.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "schemes")
public class Scheme {

    @Id
    private String id;

    // Basic scheme details
    private String name;
    private String description;
    private String schemeType;   // CENTRAL or STATE
    private String state;        // null or "ALL" for central schemes

    // Eligibility criteria
    private Double minLandSize;
    private Double maxLandSize;

    private Double minIncome;
    private Double maxIncome;

    private String cropType;     // Wheat, Rice, Cotton, ALL
    private String category;     // SC, ST, OBC, GENERAL, ALL

    // Metadata
    private boolean active = true;
}