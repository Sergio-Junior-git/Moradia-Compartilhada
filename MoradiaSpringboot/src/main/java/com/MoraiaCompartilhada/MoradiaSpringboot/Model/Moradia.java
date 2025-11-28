package com.MoraiaCompartilhada.MoradiaSpringboot.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Enum.TipoMoradia;

@Entity
@Table(name = "moradia")
public class Moradia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_moradia")
    private Integer id;

    @Column
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "quartos")
    private int quartos;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoMoradia tipo;

    @Column
    private String endereco;

    @Column
    private float preco;

    @Column(name = "disponivel_imediatamente")
    private Boolean disponivelImediatamente;

    @Column(name = "contas_inclusas")
    private Boolean contasInclusas;

    @ManyToOne
    @JoinColumn(name = "cod_usuario_dono")
    private Usuario owner;

    @OneToMany(mappedBy = "moradia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foto> fotos = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public Usuario getOwner() {
        return owner;
    }

    public void setOwner(Usuario owner) {
        this.owner = owner;
    }

    public List<Foto> getFotos() {
        return fotos;
    }

    public void setFotos(List<Foto> fotos) {
        this.fotos = fotos;
    }

    public int getQuartos() {
        return quartos;
    }

    public void setQuartos(int quartos) {
        this.quartos = quartos;
    }

    public TipoMoradia getTipo() {
        return tipo;
    }

    public void setTipo(TipoMoradia tipo) {
        this.tipo = tipo;
    }

    public Boolean getDisponivelImediatamente() { return disponivelImediatamente; }
    public void setDisponivelImediatamente(Boolean disponivelImediatamente) { this.disponivelImediatamente = disponivelImediatamente; }

    public Boolean getContasInclusas() { return contasInclusas; }
    public void setContasInclusas(Boolean contasInclusas) { this.contasInclusas = contasInclusas; }
    
}
