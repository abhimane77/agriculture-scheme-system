package com.agriculture.backend.repository;

import com.agriculture.backend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    // get notifications of a farmer (latest first)
    List<Notification> findByFarmerIdOrderByCreatedAtDesc(String farmerId);
}