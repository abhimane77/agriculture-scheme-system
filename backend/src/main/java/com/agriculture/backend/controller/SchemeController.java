package com.agriculture.backend.controller;

import com.agriculture.backend.model.Farmer;
import com.agriculture.backend.model.Notification;
import com.agriculture.backend.model.Scheme;
import com.agriculture.backend.repository.FarmerRepository;
import com.agriculture.backend.repository.NotificationRepository;
import com.agriculture.backend.repository.SchemeRepository;
import com.agriculture.backend.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin
public class SchemeController {

    private final SchemeRepository schemeRepository;
    private final FarmerRepository farmerRepository;
    private final NotificationRepository notificationRepository;
    private final RecommendationService recommendationService;

    public SchemeController(SchemeRepository schemeRepository,
                            FarmerRepository farmerRepository,
                            NotificationRepository notificationRepository,
                            RecommendationService recommendationService) {
        this.schemeRepository = schemeRepository;
        this.farmerRepository = farmerRepository;
        this.notificationRepository = notificationRepository;
        this.recommendationService = recommendationService;
    }

    // ✅ ADMIN: Add new scheme
    @PostMapping
    public ResponseEntity<?> addScheme(@RequestBody Scheme scheme) {

        // save scheme
        Scheme savedScheme = schemeRepository.save(scheme);

        // 🔔 create notifications for eligible farmers
        List<Farmer> farmers = farmerRepository.findAll();

        for (Farmer farmer : farmers) {
            boolean eligible = recommendationService
                    .getEligibleSchemes(farmer)
                    .stream()
                    .anyMatch(s -> s.getId().equals(savedScheme.getId()));

            if (eligible) {
                Notification notification = new Notification();
                notification.setFarmerId(farmer.getId());
                notification.setSchemeId(savedScheme.getId());
                notification.setMessage(
                        "You are eligible for scheme: " + savedScheme.getName()
                );

                notificationRepository.save(notification);
            }
        }

        return ResponseEntity.ok(savedScheme);
    }

    // ✅ ADMIN: View all schemes
    @GetMapping
    public ResponseEntity<List<Scheme>> getAllSchemes() {
        return ResponseEntity.ok(schemeRepository.findAll());
    }

    // ✅ ADMIN: View only active schemes
    @GetMapping("/active")
    public ResponseEntity<List<Scheme>> getActiveSchemes() {
        return ResponseEntity.ok(schemeRepository.findByActive(true));
    }
}