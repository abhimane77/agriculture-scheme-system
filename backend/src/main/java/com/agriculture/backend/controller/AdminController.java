package com.agriculture.backend.controller;

import com.agriculture.backend.model.Admin;
import com.agriculture.backend.model.Farmer;
import com.agriculture.backend.repository.AdminRepository;
import com.agriculture.backend.repository.FarmerRepository;
import com.agriculture.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final FarmerRepository farmerRepository;
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AdminController(FarmerRepository farmerRepository,
                           AdminRepository adminRepository,
                           JwtUtil jwtUtil,
                           PasswordEncoder passwordEncoder) {
        this.farmerRepository = farmerRepository;
        this.adminRepository = adminRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // ✅ ADMIN REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {

        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Admin already exists");
        }

        admin.setRole("ROLE_ADMIN");
        admin.setPassword(passwordEncoder.encode(admin.getPassword())); // 🔐 BCrypt

        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // =========================
    // 🔐 ADMIN LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {

        Admin dbAdmin = adminRepository.findByEmail(admin.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // ✅ BCrypt password check
        if (!passwordEncoder.matches(admin.getPassword(), dbAdmin.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        String token = jwtUtil.generateToken(
                dbAdmin.getEmail(),
                dbAdmin.getRole()
        );

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "role", dbAdmin.getRole()
                )
        );
    }

    // =========================
    // ✅ VERIFY FARMER (ADMIN ONLY)
    // =========================
    @PutMapping("/verify/{farmerId}")
    public ResponseEntity<?> verifyFarmer(@PathVariable String farmerId) {

        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        farmer.setVerified(true);
        farmerRepository.save(farmer);

        return ResponseEntity.ok("Farmer verified successfully");
    }
    // =========================
// 📋 GET ALL FARMERS
// =========================
    @GetMapping("/farmers")
    public ResponseEntity<?> getAllFarmers() {
        return ResponseEntity.ok(farmerRepository.findAll());
    }

    // =========================
// ⏳ GET PENDING FARMERS
// =========================
    @GetMapping("/pending-farmers")
    public ResponseEntity<?> getPendingFarmers() {
        return ResponseEntity.ok(
                farmerRepository.findAll()
                        .stream()
                        .filter(farmer -> !farmer.isVerified())
                        .toList()
        );
    }
}