//  Encriptografa a senha, e salva o usuario no banco, fazendo que seja possivel ter um sistema de login

package com.MoraiaCompartilhada.MoradiaSpringboot.Services;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Usuario;
import com.MoraiaCompartilhada.MoradiaSpringboot.Repo.UsuarioRepo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepo usuarioRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepo usuarioRepo, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario registrarUsuario(Usuario usuario) {
        // Verifica se o email ja ta sendo usado
        if (usuarioRepo.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email já está em uso.");
        }
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
        usuario.setDataCadastro(LocalDate.now());
        return usuarioRepo.save(usuario);
    }

    // é o get por meio do email
    public Optional<Usuario>encontrarPorEmail(String email) {
        return usuarioRepo.findByEmail(email);
    }

    // testa a senha pra ver se bate
    public boolean checarPassword(String raw, String encoded) {
        return passwordEncoder.matches(raw, encoded);
    }

    // sistema pra alterar as informações em si
    public Usuario atualizarPerfil(Long id, Usuario updated) {
    Usuario u = usuarioRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    u.setNome(updated.getNome());
    u.setSobrenome(updated.getSobrenome());
    u.setEmail(updated.getEmail());
    u.setTelefone(updated.getTelefone());
    u.setGenero(updated.getGenero());
    u.setDataNascimento(updated.getDataNascimento());

    return usuarioRepo.save(u);
    }

    // sistema pra alterar senha
    public void alterarSenha(Long id, String senhaAtual, String novaSenha) {
    Usuario u = usuarioRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    if (!checarPassword(senhaAtual, u.getSenha())) {
        throw new RuntimeException("Senha atual incorreta");
    }

    u.setSenha(passwordEncoder.encode(novaSenha));
    usuarioRepo.save(u);
}
}
