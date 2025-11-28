-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: unilar
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fotos`
--

DROP TABLE IF EXISTS `fotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `moradia_id` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `moradia_id` (`moradia_id`),
  CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`moradia_id`) REFERENCES `moradia` (`codigo_moradia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotos`
--

LOCK TABLES `fotos` WRITE;
/*!40000 ALTER TABLE `fotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `fotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moradia`
--

DROP TABLE IF EXISTS `moradia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moradia` (
  `codigo_moradia` int NOT NULL AUTO_INCREMENT,
  `endereco` varchar(255) DEFAULT NULL,
  `preco` float(10,2) DEFAULT NULL,
  `cod_usuario_dono` int DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descricao` text,
  `quartos` int DEFAULT NULL,
  `tipo` enum('APARTAMENTO','CASA','KITNET','QUARTO') DEFAULT NULL,
  `contas_inclusas` bit(1) DEFAULT NULL,
  `disponivel_imediatamente` bit(1) DEFAULT NULL,
  PRIMARY KEY (`codigo_moradia`),
  KEY `cod_usuario_dono` (`cod_usuario_dono`),
  CONSTRAINT `moradia_ibfk_1` FOREIGN KEY (`cod_usuario_dono`) REFERENCES `usuarios` (`codigo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moradia`
--

LOCK TABLES `moradia` WRITE;
/*!40000 ALTER TABLE `moradia` DISABLE KEYS */;
INSERT INTO `moradia` VALUES (1,'Rua Maria Ramos, 850, Olinda-Pe',1400.00,1,'Apartamento para compartilhar perto do FMO','Um apartamento em olinda perto da faculdade FMO em bairro novo para estudantes que querem morar perto de onde estudam',2,'APARTAMENTO',NULL,NULL),(2,'Rua jõao Ubaldo de Miranda, 14, Bonsucesso, Olinda - PE',1200.00,1,'Casa com 4 quartos no foco do Carnaval','Uma casa com 4 quartos, 2 já estão alugados, perto do foco do carnaval(Da para ir andando)',2,'CASA',_binary '\0',_binary ''),(3,'Rua Manuel Corte Real, 506, Engenho do Meio, Recife - PE',600.00,2,'Casa proxima a UFPE','Uma casa com 3 quartos para jovens que estudam na UFPE, tem 3 quartos, não é liberado casais, liberado bebidas alcoolicas e é estritamente proibido brigas entre os jovens',3,'CASA',_binary '\0',_binary '');
/*!40000 ALTER TABLE `moradia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codigo_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `data_cadastro` date DEFAULT NULL,
  `genero` enum('Feminino','Masculino') DEFAULT NULL,
  `sobrenome` varchar(255) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  PRIMARY KEY (`codigo_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Sergio','eaweaewq@gmail.com','$2a$10$eFnvwAvZ2nvFoqtg/OaSJ.YTikhWom6SBTrzEicjX3aJL.D9A5ajm','81997875731','2025-11-14','Masculino','Junior','2007-02-25'),(2,'Gustavo','awdsawdwa@gmail.com','$2a$10$r6bqjfDEOsc6pzqSAJS0KuEgQGDxn7ZL2UWP9xbvJiQvhqKgxKsCq','81993994321','2025-11-16','Masculino','Henrique','2002-03-31');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-27 22:56:21
