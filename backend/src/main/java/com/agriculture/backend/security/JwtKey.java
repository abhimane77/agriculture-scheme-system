package com.agriculture.backend.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class JwtKey {
    public static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
}