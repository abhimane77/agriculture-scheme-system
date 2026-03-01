package com.agriculture.backend.controller;

import com.agriculture.backend.model.Farmer;
import com.agriculture.backend.model.Notification;
import com.agriculture.backend.model.Scheme;
import com.agriculture.backend.repository.FarmerRepository;
import com.agriculture.backend.repository.NotificationRepository;
import com.agriculture.backend.security.JwtUtil;
import com.agriculture.backend.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    private final FarmerRepository farmerRepository;
    private final NotificationRepository notificationRepository;
    private final JwtUtil jwtUtil;
    private final RecommendationService recommendationService;
    private final PasswordEncoder passwordEncoder;

    public FarmerController(FarmerRepository farmerRepository,
                            JwtUtil jwtUtil,
                            RecommendationService recommendationService,
                            NotificationRepository notificationRepository) {
        this.farmerRepository = farmerRepository;
        this.jwtUtil = jwtUtil;
        this.recommendationService = recommendationService;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // ✅ encoder
    }

    // ✅ FARMER REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Farmer farmer) {

        if (farmerRepository.findByMobile(farmer.getMobile()).isPresent()) {
            return ResponseEntity.badRequest().body("Mobile number already registered");
        }

        if (farmerRepository.findByEmail(farmer.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        farmer.setVerified(false);
        farmer.setRole("ROLE_FARMER");
        farmer.setPassword(passwordEncoder.encode(farmer.getPassword())); // 🔐 encode

        Farmer savedFarmer = farmerRepository.save(farmer);
        return ResponseEntity.ok(savedFarmer);
    }

    // ✅ FARMER LOGIN (MOBILE)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Farmer farmer) {

        Farmer dbFarmer = farmerRepository.findByMobile(farmer.getMobile())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        System.out.println("INPUT mobile = " + farmer.getMobile());
        System.out.println("INPUT password = " + farmer.getPassword());
        System.out.println("DB password = " + dbFarmer.getPassword());
        System.out.println("MATCH = " + passwordEncoder.matches(
                farmer.getPassword(),
                dbFarmer.getPassword()
        ));

        if (!dbFarmer.isVerified()) {
            return ResponseEntity.badRequest().body("Farmer not verified by admin");
        }

        if (!passwordEncoder.matches(farmer.getPassword(), dbFarmer.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        String token = jwtUtil.generateToken(
                dbFarmer.getMobile(),
                dbFarmer.getRole()
        );

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "role", dbFarmer.getRole()
                )
        );
    }

    // ⭐ FARMER SCHEME RECOMMENDATIONS
    @GetMapping("/recommendations/{farmerId}")
    public ResponseEntity<List<Scheme>> getRecommendations(@PathVariable String farmerId) {

        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        List<Scheme> schemes = recommendationService.getEligibleSchemes(farmer);
        return ResponseEntity.ok(schemes);
    }

    // 🔔 FARMER NOTIFICATIONS
    @GetMapping("/notifications/{farmerId}")
    public ResponseEntity<?> getNotifications(@PathVariable String farmerId) {
        return ResponseEntity.ok(
                notificationRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId)
        );
    }

    // ✅ MARK NOTIFICATION AS READ
    @PutMapping("/notifications/read/{notificationId}")
    public ResponseEntity<?> markAsRead(@PathVariable String notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepository.save(notification);

        return ResponseEntity.ok("Notification marked as read");
    }
}