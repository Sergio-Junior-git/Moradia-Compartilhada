package com.MoraiaCompartilhada.MoradiaSpringboot.Controllers;

import com.MoraiaCompartilhada.MoradiaSpringboot.Model.Foto;
import com.MoraiaCompartilhada.MoradiaSpringboot.Services.FotoService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/fotos")
@CrossOrigin("*")
public class FotoController {
    private final FotoService service;
    public FotoController(FotoService service){ this.service = service; }

    @PostMapping("/upload/{moradiaId}")
    public ResponseEntity<Foto> upload(@PathVariable Long moradiaId, @RequestParam("file") MultipartFile file) throws IOException {
        Foto f = service.upload(moradiaId, file);
        return ResponseEntity.ok(f);
    }

    @GetMapping("/moradia/{moradiaId}")
    public List<Foto> listByMoradia(@PathVariable Long moradiaId){
        return service.listByMoradia(moradiaId);
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<byte[]> serveFile(@PathVariable String filename) throws IOException {
        byte[] data = service.getFileBytes(filename);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity.ok().headers(headers).body(data);
    }
}