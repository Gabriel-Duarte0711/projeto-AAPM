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
  `numero_armario` int(11) NOT NULL,
  `estado` enum('D','O','M','A') NOT NULL DEFAULT 'D',
  PRIMARY KEY (`numero_armario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_armario: ~176 rows (aproximadamente)
INSERT INTO `tabela_armario` (`numero_armario`, `estado`) VALUES
	(1, 'M'),
	(2, 'M'),
	(3, 'M'),
	(4, 'M'),
	(5, 'M'),
	(6, 'M'),
	(7, 'D'),
	(8, 'M'),
	(9, 'D'),
	(10, 'D'),
	(11, 'D'),
	(12, 'D'),
	(13, 'M'),
	(14, 'M'),
	(15, 'D'),
	(16, 'M'),
	(17, 'M'),
	(18, 'D'),
	(19, 'O'),
	(20, 'D'),
	(21, 'D'),
	(22, 'D'),
	(23, 'M'),
	(24, 'D'),
	(25, 'D'),
	(26, 'M'),
	(27, 'D'),
	(28, 'D'),
	(29, 'D'),
	(30, 'D'),
	(31, 'D'),
	(32, 'M'),
	(33, 'M'),
	(34, 'D'),
	(35, 'D'),
	(36, 'D'),
	(37, 'D'),
	(38, 'M'),
	(39, 'M'),
	(40, 'M'),
	(41, 'D'),
	(42, 'D'),
	(43, 'M'),
	(44, 'M'),
	(45, 'M'),
	(46, 'D'),
	(47, 'M'),
	(48, 'M'),
	(49, 'D'),
	(50, 'O'),
	(51, 'D'),
	(52, 'D'),
	(53, 'D'),
	(54, 'O'),
	(55, 'M'),
	(56, 'M'),
	(57, 'O'),
	(58, 'M'),
	(59, 'D'),
	(60, 'M'),
	(61, 'M'),
	(62, 'M'),
	(63, 'M'),
	(64, 'M'),
	(65, 'M'),
	(66, 'M'),
	(67, 'M'),
	(68, 'M'),
	(69, 'O'),
	(70, 'M'),
	(71, 'D'),
	(72, 'D'),
	(73, 'M'),
	(74, 'M'),
	(75, 'D'),
	(76, 'D'),
	(77, 'D'),
	(78, 'D'),
	(79, 'D'),
	(80, 'D'),
	(81, 'D'),
	(82, 'M'),
	(83, 'D'),
	(84, 'D'),
	(85, 'M'),
	(86, 'D'),
	(87, 'M'),
	(88, 'M'),
	(89, 'M'),
	(90, 'O'),
	(91, 'D'),
	(92, 'D'),
	(93, 'D'),
	(94, 'D'),
	(95, 'D'),
	(96, 'D'),
	(97, 'D'),
	(98, 'D'),
	(99, 'D'),
	(100, 'D'),
	(101, 'M'),
	(102, 'M'),
	(103, 'M'),
	(104, 'D'),
	(105, 'D'),
	(106, 'M'),
	(107, 'M'),
	(108, 'D'),
	(109, 'D'),
	(110, 'O'),
	(111, 'D'),
	(112, 'M'),
	(113, 'M'),
	(114, 'M'),
	(115, 'D'),
	(116, 'D'),
	(117, 'M'),
	(118, 'D'),
	(119, 'D'),
	(120, 'O'),
	(121, 'M'),
	(122, 'M'),
	(123, 'D'),
	(124, 'O'),
	(125, 'D'),
	(126, 'O'),
	(127, 'M'),
	(128, 'M'),
	(129, 'M'),
	(130, 'D'),
	(131, 'M'),
	(132, 'M'),
	(133, 'M'),
	(134, 'M'),
	(135, 'D'),
	(136, 'M'),
	(137, 'M'),
	(138, 'O'),
	(139, 'D'),
	(140, 'D'),
	(141, 'M'),
	(142, 'D'),
	(143, 'M'),
	(144, 'D'),
	(145, 'M'),
	(146, 'D'),
	(147, 'D'),
	(148, 'D'),
	(149, 'D'),
	(150, 'D'),
	(151, 'D'),
	(152, 'M'),
	(153, 'O'),
	(154, 'M'),
	(155, 'M'),
	(156, 'D'),
	(157, 'M'),
	(158, 'O'),
	(159, 'O'),
	(160, 'D'),
	(161, 'D'),
	(162, 'D'),
	(163, 'D'),
	(164, 'D'),
	(165, 'D'),
	(166, 'D'),
	(167, 'M'),
	(168, 'O'),
	(169, 'M'),
	(170, 'M'),
	(171, 'D'),
	(172, 'M'),
	(173, 'M'),
	(174, 'M'),
	(175, 'M'),
	(176, 'O');

-- Copiando estrutura para tabela aapm.tabela_curso
CREATE TABLE IF NOT EXISTS `tabela_curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_curso: ~7 rows (aproximadamente)
INSERT INTO `tabela_curso` (`id`, `nome`) VALUES
	(1, 'Informática'),
	(2, 'Administração'),
	(3, 'Contabilidade'),
	(4, 'Enfermagem'),
	(5, 'Eletrotécnica'),
	(6, 'Mecânica'),
	(7, 'Logística');

-- Copiando estrutura para tabela aapm.tabela_login
CREATE TABLE IF NOT EXISTS `tabela_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `perfil` enum('aluno','admin') DEFAULT 'aluno',
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`aluno_id`),
  CONSTRAINT `tabela_login_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `tabela_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_login: ~2 rows (aproximadamente)
INSERT INTO `tabela_login` (`id`, `aluno_id`, `senha`, `perfil`) VALUES
	(1, 1, '1', 'aluno'),
	(2, 2, '999', 'admin');

-- Copiando estrutura para tabela aapm.tabela_turma
CREATE TABLE IF NOT EXISTS `tabela_turma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `turma` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `tabela_turma_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_turma: ~10 rows (aproximadamente)
INSERT INTO `tabela_turma` (`id`, `turma`, `curso_id`) VALUES
	(1, '1º Ano A', 1),
	(2, '1º Ano B', 1),
	(3, '2º Ano A', 1),
	(4, '1º Ano Administração A', 2),
	(5, '1º Ano Administração B', 2),
	(6, '3º Ano Contabilidade A', 3),
	(7, '1º Enfermagem A', 4),
	(8, '2º Eletrotécnica A', 5),
	(9, '3º Mecânica A', 6),
	(10, '1º Logística A', 7);

-- Copiando estrutura para tabela aapm.tabela_usuario
CREATE TABLE IF NOT EXISTS `tabela_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `matricula` char(11) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `turma_id` int(11) DEFAULT NULL,
  `armario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`matricula`) USING BTREE,
  KEY `curso_id` (`curso_id`),
  KEY `tabela_armario_ibfk_2` (`armario_id`),
  KEY `tabela_usuario_ibfk_3` (`turma_id`),
  CONSTRAINT `tabela_armario_ibfk_2` FOREIGN KEY (`armario_id`) REFERENCES `tabela_armario` (`numero_armario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tabela_usuario_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`),
  CONSTRAINT `tabela_usuario_ibfk_3` FOREIGN KEY (`turma_id`) REFERENCES `tabela_turma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_usuario: ~2 rows (aproximadamente)
INSERT INTO `tabela_usuario` (`id`, `nome`, `matricula`, `telefone`, `email`, `curso_id`, `turma_id`, `armario_id`) VALUES
	(1, 'teste', '1', '11988877766', 'teste@gmail.com', 1, 1, 1),
	(2, 'admin', '999', '11988638137', 'admin@gmail.com', 2, 2, 1);

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
        VALUES (NEW.id, NEW.matricula);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
