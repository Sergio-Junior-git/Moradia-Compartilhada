package com.MoraiaCompartilhada.MoradiaSpringboot.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "fotos")
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String fileName;

    @ManyToOne
    @JoinColumn(name = "moradia_id")
    private Moradia moradia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    } 

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Moradia getMoradia() {
        return moradia;
    }

    public void setMoradia(Moradia moradia) {
        this.moradia = moradia;
    }

    
}
