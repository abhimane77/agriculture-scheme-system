package com.agriculture.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String farmerId;
    private String schemeId;

    private String message;

    private boolean read = false;

    private LocalDateTime createdAt = LocalDateTime.now();
}