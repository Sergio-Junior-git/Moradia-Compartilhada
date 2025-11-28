package com.MoraiaCompartilhada.MoradiaSpringboot.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Moradia;
import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Enum.TipoMoradia;
import com.MoraiaCompartilhada.MoradiaSpringboot.Repo.MoradiaRepo;

import org.springframework.lang.NonNull;

@Service
public class MoradiaService {

    private final MoradiaRepo moradiaRepo;


    public MoradiaService(MoradiaRepo moradiaRepo) {
        this.moradiaRepo = moradiaRepo;
    }

    public List<Moradia> GetAllMoradia() {
        return moradiaRepo.findAll();
    }

    public Optional<Moradia> GetMoradia(long id) {
        return moradiaRepo.findById(id);
    }

        public List<Moradia> GetMoradiaDono(long OwnerId) {
        return moradiaRepo.findByOwnerId(OwnerId);
    }

    @NonNull // isso aq faz o java garantir q o CriarMoradia n seja nula
    public Moradia CriarMoradia(@NonNull Moradia moradia) {
        return moradiaRepo.save(moradia);
    }

    public Moradia updateMoradia(long id, Moradia newMoradia) {
        return moradiaRepo.findById(id).map(moradia -> {
            moradia.setTitulo(newMoradia.getTitulo());
            moradia.setDescricao(newMoradia.getDescricao());
            moradia.setEndereco(newMoradia.getEndereco());
            moradia.setPreco(newMoradia.getPreco());
            return moradiaRepo.save(moradia);
        }).orElseThrow(() -> new RuntimeException("Não foi encontrada a moradia com id: " + id));
    }

    public void deletarMoradia(long id) {
        moradiaRepo.deleteById(id);
    }

    public List<Moradia> ProcurarTitulo(String titulo) {
        return moradiaRepo.findByTitulo(titulo);
    }
    public List<Moradia> filtrar(String texto, Float minPreco, Float maxPreco, Integer quartos, TipoMoradia tipo) {
        if (texto != null)
            texto = texto.trim();

        return moradiaRepo.filtrar(
            texto == null || texto.isEmpty() ? null : texto,
            minPreco,
            maxPreco,
            quartos,
            tipo
        );
    }

}
