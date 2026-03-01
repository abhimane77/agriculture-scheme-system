package com.agriculture.backend.repository;

import com.agriculture.backend.model.Scheme;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SchemeRepository extends MongoRepository<Scheme, String> {

    // fetch only active schemes
    List<Scheme> findByActive(boolean active);

}