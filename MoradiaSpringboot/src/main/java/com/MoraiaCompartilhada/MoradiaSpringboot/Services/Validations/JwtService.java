// é o json web token, ele serve pra fazer a autenticação do usuario

package com.MoraiaCompartilhada.MoradiaSpringboot.Services.Validations;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expirationTime = 86400000; // 1 dia em milissegundos, é tipo usar o -shutdown -s -t 86400 no cmd do windows

    // pelo oq eu entendi, ele gera o token do usuario, baseado no email e valida esse token, não sei direito
    public String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }

    public String validateTokenAndGetSubject(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
