package com.agriculture.backend.controller;

import com.agriculture.backend.model.Admin;
import com.agriculture.backend.model.Farmer;
import com.agriculture.backend.repository.AdminRepository;
import com.agriculture.backend.repository.FarmerRepository;
import com.agriculture.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final FarmerRepository farmerRepository;
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;

    public AdminController(FarmerRepository farmerRepository,
                           AdminRepository adminRepository,
                           JwtUtil jwtUtil) {
        this.farmerRepository = farmerRepository;
        this.adminRepository = adminRepository;
        this.jwtUtil = jwtUtil;
    }

    // 🔐 ADMIN LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {

        Admin dbAdmin = adminRepository.findByEmail(admin.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!dbAdmin.getPassword().equals(admin.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        String token = jwtUtil.generateToken(
                dbAdmin.getEmail(),
                dbAdmin.getRole()
        );

        return ResponseEntity.ok(token);
    }

    // ✅ VERIFY FARMER
    @PutMapping("/verify/{farmerId}")
    public ResponseEntity<?> verifyFarmer(@PathVariable String farmerId) {

        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        farmer.setVerified(true);
        farmerRepository.save(farmer);

        return ResponseEntity.ok("Farmer verified successfully");
    }
}