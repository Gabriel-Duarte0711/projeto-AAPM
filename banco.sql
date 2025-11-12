-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.0.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para aapm
CREATE DATABASE IF NOT EXISTS `aapm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `aapm`;

-- Copiando estrutura para tabela aapm.tabela_armario
CREATE TABLE IF NOT EXISTS `tabela_armario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_armario` int(11) DEFAULT NULL,
  `estado` enum('disponivel','ocupado','manutencao') DEFAULT 'disponivel',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_armario: ~15 rows (aproximadamente)
DELETE FROM `tabela_armario`;
INSERT INTO `tabela_armario` (`id`, `numero_armario`, `estado`) VALUES
	(1, 100, 'disponivel'),
	(2, 102, 'disponivel'),
	(3, 103, 'disponivel'),
	(4, 104, 'manutencao'),
	(5, 105, 'disponivel'),
	(6, 106, 'disponivel'),
	(7, 107, 'disponivel'),
	(8, 108, 'disponivel'),
	(9, 109, 'disponivel'),
	(10, 110, 'disponivel'),
	(11, 111, 'manutencao'),
	(12, 112, 'disponivel'),
	(13, 113, 'disponivel'),
	(14, 114, 'disponivel'),
	(15, 115, 'disponivel');

-- Copiando estrutura para tabela aapm.tabela_curso
CREATE TABLE IF NOT EXISTS `tabela_curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_curso: ~20 rows (aproximadamente)
DELETE FROM `tabela_curso`;
INSERT INTO `tabela_curso` (`id`, `nome`) VALUES
	(1, 'Administração'),
	(2, 'Desenvolvimento de Sistemas'),
	(3, 'Eletrotécnica'),
	(4, 'Logística'),
	(5, 'Mecânica Industrial'),
	(6, 'Mecatrônica'),
	(7, 'Tecnologia da Informação'),
	(8, 'Segurança do Trabalho'),
	(9, 'Soldagem'),
	(10, 'Design Gráfico'),
	(11, 'Enfermagem'),
	(12, 'Marketing'),
	(13, 'Recursos Humanos'),
	(14, 'Programação Web'),
	(15, 'Redes de Computadores'),
	(16, 'Banco de Dados'),
	(17, 'Automação Industrial'),
	(18, 'Edificações'),
	(19, 'Informática para Internet'),
	(20, 'Manutenção Automotiva');

-- Copiando estrutura para tabela aapm.tabela_login
CREATE TABLE IF NOT EXISTS `tabela_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`aluno_id`),
  CONSTRAINT `tabela_login_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_login: ~0 rows (aproximadamente)
DELETE FROM `tabela_login`;

-- Copiando estrutura para tabela aapm.tabela_reserva_armario
CREATE TABLE IF NOT EXISTS `tabela_reserva_armario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `armario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`aluno_id`),
  KEY `armario_id` (`armario_id`),
  CONSTRAINT `tabela_reserva_armario_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`),
  CONSTRAINT `tabela_reserva_armario_ibfk_2` FOREIGN KEY (`armario_id`) REFERENCES `armario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_reserva_armario: ~0 rows (aproximadamente)
DELETE FROM `tabela_reserva_armario`;

-- Copiando estrutura para tabela aapm.tabela_usuario
CREATE TABLE IF NOT EXISTS `tabela_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `armario_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`),
  KEY `curso_id` (`curso_id`),
  KEY `armario_id` (`armario_id`),
  CONSTRAINT `tabela_usuario_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id`),
  CONSTRAINT `tabela_usuario_ibfk_2` FOREIGN KEY (`armario_id`) REFERENCES `reserva_armario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_usuario: ~0 rows (aproximadamente)
DELETE FROM `tabela_usuario`;

-- Copiando estrutura para trigger aapm.trg_criar_login
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER trg_criar_login
AFTER INSERT ON tabela_usuario
FOR EACH ROW
BEGIN
    -- Só cria login se ainda não existir para esse aluno
    IF NOT EXISTS (SELECT 1 FROM tabela_login WHERE aluno_id = NEW.id) THEN
        INSERT INTO tabela_login (aluno_id, senha)
        VALUES (NEW.id, NEW.cpf);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Copiando estrutura para trigger aapm.trg_criar_reserva
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER trg_criar_reserva
AFTER INSERT ON tabela_usuario
FOR EACH ROW
BEGIN
    -- Só cria login se ainda não existir para esse aluno
    IF NOT EXISTS (SELECT 1 FROM login WHERE aluno_id = NEW.id) THEN
        INSERT INTO tabela_reserva_armario (aluno_id, armario_id)
        VALUES (NEW.id, NEW.armario_id);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
