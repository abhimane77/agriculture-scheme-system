package com.agriculture.backend.repository;

import com.agriculture.backend.model.Farmer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FarmerRepository extends MongoRepository<Farmer, String> {

    Optional<Farmer> findByEmail(String email);

    Optional<Farmer> findByMobile(String mobile);

    List<Farmer> findByVerified(boolean verified);
}