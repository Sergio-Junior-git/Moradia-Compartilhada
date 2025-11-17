package com.MoraiaCompartilhada.MoradiaSpringboot.Controllers;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Moradia;
import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Enum.TipoMoradia;
import com.MoraiaCompartilhada.MoradiaSpringboot.Services.MoradiaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moradias")
@CrossOrigin("*")
public class MoradiaController {
    private final MoradiaService service;
    public MoradiaController(MoradiaService service){ 
        this.service = service; 
    }

    @GetMapping
    public List<Moradia> all() { 
        return service.GetAllMoradia();
    }

    @GetMapping("/search")
    public List<Moradia> search(@RequestParam String q){
        return service.ProcurarTitulo(q);
    }

    @GetMapping("/dono/{idDono}")
        public List<Moradia> getMoradiasDoDono(@PathVariable Long idDono) {
        return service.GetMoradiaDono(idDono);
    }

    @GetMapping("/filtrar")
    public List<Moradia> filtrar(
        @RequestParam(required = false) String texto,
        @RequestParam(required = false) Float minPreco,
        @RequestParam(required = false) Float maxPreco,
        @RequestParam(required = false) Integer quartos,
        @RequestParam(required = false) TipoMoradia tipo
    ) {
        return service.filtrar(texto, minPreco, maxPreco, quartos, tipo);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Moradia> get(@PathVariable Long id){
        return service.GetMoradia(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping // baguiu de garantir que ele é nulo, no meu service eu passei q ele vai ser nulo obrigatoriamente
    public ResponseEntity<Moradia> create(@RequestBody Moradia moradia){
        Moradia created = service.CriarMoradia(moradia);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Moradia> update(@PathVariable Long id, @RequestBody Moradia m){
        try {
            return ResponseEntity.ok(service.updateMoradia(id, m));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deletarMoradia(id);
        return ResponseEntity.noContent().build();
    }


}