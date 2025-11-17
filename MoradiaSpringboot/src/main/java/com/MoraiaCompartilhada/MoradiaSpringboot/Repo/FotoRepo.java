package com.MoraiaCompartilhada.MoradiaSpringboot.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Foto;

import java.util.List;

public interface FotoRepo extends JpaRepository<Foto, Long> {
    List<Foto> findByMoradiaId(Long moradiaId);
}
