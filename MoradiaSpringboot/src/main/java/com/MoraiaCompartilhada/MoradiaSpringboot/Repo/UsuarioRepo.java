package com.MoraiaCompartilhada.MoradiaSpringboot.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Usuario;

import java.util.Optional;

public interface UsuarioRepo extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

}
