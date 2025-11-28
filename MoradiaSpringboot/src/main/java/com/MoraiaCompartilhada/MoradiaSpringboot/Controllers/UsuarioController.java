package com.MoraiaCompartilhada.MoradiaSpringboot.Controllers;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Usuario;
import com.MoraiaCompartilhada.MoradiaSpringboot.Services.UsuarioService;
import com.MoraiaCompartilhada.MoradiaSpringboot.Services.Validations.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public UsuarioController(UsuarioService usuarioService, JwtService jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario u) {
        try {
            Usuario created = usuarioService.registrarUsuario(u);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String senha = data.get("senha");

        var userOpt = usuarioService.encontrarPorEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Usuário não encontrado"));
        }

        Usuario user = userOpt.get();
        if (!usuarioService.checarPassword(senha, user.getSenha())) {
            return ResponseEntity.status(401).body(Map.of("error", "Senha incorreta"));
        }

        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "usuario", user
        ));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Usuario u, @RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtService.validateTokenAndGetSubject(authHeader.substring(7));
            Usuario atual = usuarioService.encontrarPorEmail(email).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            Usuario atualizado = usuarioService.atualizarPerfil(atual.getId().longValue(), u);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> data, @RequestHeader("Authorization") String authHeader) {
        try {
            String email = jwtService.validateTokenAndGetSubject(authHeader.substring(7));
            Usuario u = usuarioService.encontrarPorEmail(email).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            String senhaAtual = data.get("senhaAtual");
            String novaSenha = data.get("novaSenha");

            usuarioService.alterarSenha(u.getId().longValue(), senhaAtual, novaSenha);
            return ResponseEntity.ok(Map.of("message", "Senha alterada com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}