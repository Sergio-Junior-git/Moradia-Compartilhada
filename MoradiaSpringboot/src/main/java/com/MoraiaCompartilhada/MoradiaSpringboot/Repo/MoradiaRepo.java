package com.MoraiaCompartilhada.MoradiaSpringboot.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Moradia;
import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Enum.TipoMoradia;

import java.util.List;

public interface MoradiaRepo extends JpaRepository<Moradia, Long> {
    List<Moradia> findByOwnerId(Long ownerId);
    List<Moradia> findByTitulo(String titulo);

    @Query("""
        SELECT m FROM Moradia m
        WHERE
            (:texto IS NULL 
                OR LOWER(m.titulo) LIKE LOWER(CONCAT('%', :texto, '%'))
                OR LOWER(m.descricao) LIKE LOWER(CONCAT('%', :texto, '%'))
                OR LOWER(m.endereco) LIKE LOWER(CONCAT('%', :texto, '%'))
            )
            AND (:minPreco IS NULL OR m.preco >= :minPreco)
            AND (:maxPreco IS NULL OR m.preco <= :maxPreco)
            AND (:quartos IS NULL OR m.quartos = :quartos)
            AND (:tipo IS NULL OR m.tipo = :tipo)
        """)


    List<Moradia> filtrar(
    @Param("texto") String texto,
    @Param("minPreco") Float minPreco,
    @Param("maxPreco") Float maxPreco,
    @Param("quartos") Integer quartos,
    @Param("tipo") TipoMoradia tipo
    );
    
}
