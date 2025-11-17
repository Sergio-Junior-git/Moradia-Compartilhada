package com.MoraiaCompartilhada.MoradiaSpringboot.Services;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Foto;
import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Moradia;
import com.MoraiaCompartilhada.MoradiaSpringboot.Repo.FotoRepo;
import com.MoraiaCompartilhada.MoradiaSpringboot.Repo.MoradiaRepo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class FotoService {
    @Value("${app.upload.dir}")
    private String uploadDir;

    private final FotoRepo fotoRepo;
    private final MoradiaRepo moradiaRepo;

    public FotoService(FotoRepo fotoRepo, MoradiaRepo moradiaRepo){
        this.fotoRepo = fotoRepo;
        this.moradiaRepo = moradiaRepo;
    }

    public Foto upload(long moradiaId, MultipartFile file) throws IOException {
        Moradia m = moradiaRepo.findById(moradiaId).orElseThrow(() -> new RuntimeException("Moradia não encontrada"));
        Files.createDirectories(Paths.get(uploadDir));
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path target = Paths.get(uploadDir).resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        Foto foto = new Foto();
        foto.setFileName(filename);
        foto.setMoradia(m);
        return fotoRepo.save(foto);
    }

    public byte[] getFileBytes(String filename) throws IOException {
        Path p = Paths.get(uploadDir).resolve(filename);
        return Files.readAllBytes(p);
    }

    public List<Foto> listByMoradia(Long moradiaId) {
        return fotoRepo.findByMoradiaId(moradiaId);
    }
}