package com.agriculture.backend.service;

import com.agriculture.backend.model.Farmer;
import com.agriculture.backend.model.Scheme;
import com.agriculture.backend.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final SchemeRepository schemeRepository;

    public RecommendationService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    public List<Scheme> getEligibleSchemes(Farmer farmer) {

        List<Scheme> activeSchemes = schemeRepository.findByActive(true);

        return activeSchemes.stream()
                .filter(scheme -> isEligible(farmer, scheme))
                .collect(Collectors.toList());
    }

    private boolean isEligible(Farmer farmer, Scheme scheme) {

        // Land size check
        if (scheme.getMinLandSize() != null &&
                farmer.getLandSize() < scheme.getMinLandSize()) {
            return false;
        }

        if (scheme.getMaxLandSize() != null &&
                farmer.getLandSize() > scheme.getMaxLandSize()) {
            return false;
        }

        // Income check
        if (scheme.getMinIncome() != null &&
                farmer.getIncome() < scheme.getMinIncome()) {
            return false;
        }

        if (scheme.getMaxIncome() != null &&
                farmer.getIncome() > scheme.getMaxIncome()) {
            return false;
        }

        // Crop check
        if (!"ALL".equalsIgnoreCase(scheme.getCropType()) &&
                !scheme.getCropType().equalsIgnoreCase(farmer.getCropType())) {
            return false;
        }

        // Category check
        if (!"ALL".equalsIgnoreCase(scheme.getCategory()) &&
                !scheme.getCategory().equalsIgnoreCase(farmer.getCategory())) {
            return false;
        }

        // State check (for state schemes)
        if ("STATE".equalsIgnoreCase(scheme.getSchemeType()) &&
                !scheme.getState().equalsIgnoreCase(farmer.getState())) {
            return false;
        }

        return true;
    }
}