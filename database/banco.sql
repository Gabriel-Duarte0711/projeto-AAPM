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

-- Copiando estrutura para tabela aapm.tabela_admin
CREATE TABLE IF NOT EXISTS `tabela_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` char(20) NOT NULL,
  `CPF` varchar(20) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `CPF` (`CPF`),
  KEY `FK_tabela_admin_tabela_usuario` (`id_usuario`),
  CONSTRAINT `FK_tabela_admin_tabela_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tabela_usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_admin: ~3 rows (aproximadamente)
INSERT INTO `tabela_admin` (`id`, `nome`, `email`, `telefone`, `CPF`, `id_usuario`, `criado_em`) VALUES
	(1, 'admin', 'admin@gmail.com', '11988776655', '12345678906', 2, '2025-12-06 00:17:31'),
	(2, 'admin', 'admin2@gmail.com', '11988776655', '12345678907', 4, '2025-12-06 00:18:01'),
	(3, 'admin3', 'admin3@gmail.com', '11988776655', '12345678908', 6, '2025-12-06 22:42:46');

-- Copiando estrutura para tabela aapm.tabela_alunos
CREATE TABLE IF NOT EXISTS `tabela_alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CPF` varchar(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `matricula` char(50) DEFAULT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `CPF` (`CPF`),
  UNIQUE KEY `matricula` (`matricula`) USING BTREE,
  KEY `curso_id` (`curso_id`),
  KEY `tabela_usuario_ibfk_3` (`turma_id`),
  KEY `FK_tabela_alunos_tabela_usuario` (`id_usuario`),
  CONSTRAINT `FK_tabela_alunos_tabela_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tabela_usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tabela_alunos_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`),
  CONSTRAINT `tabela_alunos_ibfk_3` FOREIGN KEY (`turma_id`) REFERENCES `tabela_turma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_alunos: ~8 rows (aproximadamente)
INSERT INTO `tabela_alunos` (`id`, `CPF`, `nome`, `matricula`, `telefone`, `email`, `curso_id`, `turma_id`, `id_usuario`, `criado_em`) VALUES
	(1, '01377472841', 'Gabs', '014', '11988776655', 'gabs@gmail.com', 1, 1, 3, '2025-12-06 00:17:58'),
	(2, '28231355880', 'Lopreti', '015', '11988776655', 'lopreti@gmail.com', 1, 1, 5, '2025-12-06 00:18:30'),
	(3, '84498436857', 'teste', '1221', '11988877766', 'teste@gmail.com', 14, 29, 7, '2025-12-06 22:47:45'),
	(5, '93329180820', 'teste2', '12212', '11988877744', 'teste2@gmail.com', 13, 33, 9, '2025-12-06 23:23:36'),
	(6, '70349068828', 'teste3', '12214', '11988877733', 'teste3@gmail.com', 13, 33, 10, '2025-12-06 23:28:48'),
	(7, '96950713843', 'teste4', '12215', '11988877722', 'teste4@gmail.com', 14, 29, 11, '2025-12-06 23:34:30'),
	(8, '97803386830', 'teste5', '05', '11988877733', 'teste5@gmail.com', 14, 29, 12, '2025-12-07 15:39:30'),
	(9, '63553257865', 'teste6', '1221522', '11955664433', 'teste6@gmail.com', 13, 25, 13, '2025-12-07 16:06:27');

-- Copiando estrutura para tabela aapm.tabela_armario
CREATE TABLE IF NOT EXISTS `tabela_armario` (
  `numero_armario` int(11) NOT NULL,
  `estado` enum('D','O','M','A') NOT NULL DEFAULT 'D',
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`numero_armario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_armario: ~176 rows (aproximadamente)
INSERT INTO `tabela_armario` (`numero_armario`, `estado`, `observacao`) VALUES
	(1, 'O', NULL),
	(2, 'O', NULL),
	(3, 'O', NULL),
	(4, 'O', NULL),
	(5, 'O', NULL),
	(6, 'O', NULL),
	(7, 'O', NULL),
	(8, 'O', NULL),
	(9, 'M', NULL),
	(10, 'D', NULL),
	(11, 'D', NULL),
	(12, 'D', NULL),
	(13, 'M', NULL),
	(14, 'M', NULL),
	(15, 'D', NULL),
	(16, 'D', NULL),
	(17, 'M', NULL),
	(18, 'D', NULL),
	(19, 'M', NULL),
	(20, 'M', NULL),
	(21, 'D', NULL),
	(22, 'D', NULL),
	(23, 'M', NULL),
	(24, 'D', NULL),
	(25, 'D', NULL),
	(26, 'M', NULL),
	(27, 'D', NULL),
	(28, 'D', NULL),
	(29, 'D', NULL),
	(30, 'D', NULL),
	(31, 'D', NULL),
	(32, 'M', NULL),
	(33, 'M', NULL),
	(34, 'D', NULL),
	(35, 'D', NULL),
	(36, 'D', NULL),
	(37, 'D', NULL),
	(38, 'M', NULL),
	(39, 'M', NULL),
	(40, 'M', NULL),
	(41, 'D', NULL),
	(42, 'D', NULL),
	(43, 'M', NULL),
	(44, 'M', NULL),
	(45, 'M', NULL),
	(46, 'D', NULL),
	(47, 'M', NULL),
	(48, 'M', NULL),
	(49, 'D', NULL),
	(50, 'M', NULL),
	(51, 'D', NULL),
	(52, 'D', NULL),
	(53, 'D', NULL),
	(54, 'M', NULL),
	(55, 'M', NULL),
	(56, 'M', NULL),
	(57, 'M', NULL),
	(58, 'M', NULL),
	(59, 'D', NULL),
	(60, 'M', NULL),
	(61, 'M', NULL),
	(62, 'M', NULL),
	(63, 'M', NULL),
	(64, 'M', NULL),
	(65, 'M', NULL),
	(66, 'M', NULL),
	(67, 'M', NULL),
	(68, 'M', NULL),
	(69, 'M', NULL),
	(70, 'M', NULL),
	(71, 'D', NULL),
	(72, 'D', NULL),
	(73, 'M', NULL),
	(74, 'M', NULL),
	(75, 'D', NULL),
	(76, 'D', NULL),
	(77, 'D', NULL),
	(78, 'D', NULL),
	(79, 'D', NULL),
	(80, 'D', NULL),
	(81, 'D', NULL),
	(82, 'M', NULL),
	(83, 'D', NULL),
	(84, 'D', NULL),
	(85, 'M', NULL),
	(86, 'D', NULL),
	(87, 'M', NULL),
	(88, 'M', NULL),
	(89, 'M', NULL),
	(90, 'M', NULL),
	(91, 'D', NULL),
	(92, 'D', NULL),
	(93, 'D', NULL),
	(94, 'D', NULL),
	(95, 'D', NULL),
	(96, 'D', NULL),
	(97, 'D', NULL),
	(98, 'D', NULL),
	(99, 'D', NULL),
	(100, 'D', NULL),
	(101, 'M', NULL),
	(102, 'M', NULL),
	(103, 'M', NULL),
	(104, 'D', NULL),
	(105, 'D', NULL),
	(106, 'M', NULL),
	(107, 'M', NULL),
	(108, 'D', NULL),
	(109, 'D', NULL),
	(110, 'M', NULL),
	(111, 'D', NULL),
	(112, 'M', NULL),
	(113, 'M', NULL),
	(114, 'M', NULL),
	(115, 'D', NULL),
	(116, 'D', NULL),
	(117, 'M', NULL),
	(118, 'D', NULL),
	(119, 'D', NULL),
	(120, 'M', NULL),
	(121, 'M', NULL),
	(122, 'M', NULL),
	(123, 'D', NULL),
	(124, 'M', NULL),
	(125, 'D', NULL),
	(126, 'M', NULL),
	(127, 'M', NULL),
	(128, 'M', NULL),
	(129, 'M', NULL),
	(130, 'D', NULL),
	(131, 'M', NULL),
	(132, 'M', NULL),
	(133, 'M', NULL),
	(134, 'M', NULL),
	(135, 'D', NULL),
	(136, 'M', NULL),
	(137, 'M', NULL),
	(138, 'M', NULL),
	(139, 'D', NULL),
	(140, 'D', NULL),
	(141, 'M', NULL),
	(142, 'D', NULL),
	(143, 'M', NULL),
	(144, 'D', NULL),
	(145, 'M', NULL),
	(146, 'D', NULL),
	(147, 'D', NULL),
	(148, 'D', NULL),
	(149, 'D', NULL),
	(150, 'D', NULL),
	(151, 'D', NULL),
	(152, 'M', NULL),
	(153, 'M', NULL),
	(154, 'M', NULL),
	(155, 'M', NULL),
	(156, 'D', NULL),
	(157, 'M', NULL),
	(158, 'M', NULL),
	(159, 'M', NULL),
	(160, 'D', NULL),
	(161, 'D', NULL),
	(162, 'D', NULL),
	(163, 'D', NULL),
	(164, 'D', NULL),
	(165, 'D', NULL),
	(166, 'D', NULL),
	(167, 'M', NULL),
	(168, 'M', NULL),
	(169, 'M', NULL),
	(170, 'M', NULL),
	(171, 'D', NULL),
	(172, 'M', NULL),
	(173, 'M', NULL),
	(174, 'M', NULL),
	(175, 'M', NULL),
	(176, 'M', NULL);

-- Copiando estrutura para tabela aapm.tabela_curso
CREATE TABLE IF NOT EXISTS `tabela_curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_curso: ~14 rows (aproximadamente)
INSERT INTO `tabela_curso` (`id`, `nome`) VALUES
	(1, 'Engenharia de Fundição'),
	(2, 'Engenharia de Soldagem'),
	(3, 'Superior de Tecnologia em Processos Metalúrgicos'),
	(4, 'Técnico em Metalurgia'),
	(5, 'Técnico em Desenvolvimento de Sistemas'),
	(6, 'Técnico em Administração'),
	(7, 'Construtor de Moldes e Ferramentas para Fundição'),
	(8, 'Projetista de Moldes e Ferramentas para Fundição'),
	(9, 'Assistente Administrativo'),
	(10, 'Auxiliar de Linha de Produção'),
	(11, 'Eletricista de Manutenção Eletroeletrônica'),
	(12, 'Instalador e Reparador de Equipamentos de Telecomunicações'),
	(13, 'Mecânico de Manutenção'),
	(14, 'Soldador');

-- Copiando estrutura para tabela aapm.tabela_moto
CREATE TABLE IF NOT EXISTS `tabela_moto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_aluno` int(11) NOT NULL DEFAULT 0,
  `placa` char(7) NOT NULL DEFAULT '0',
  `modelo` varchar(50) NOT NULL DEFAULT '0',
  `marca` varchar(50) NOT NULL DEFAULT '0',
  `ano` year(4) NOT NULL DEFAULT 2000,
  `cor` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_tabela_moto_tabela_alunos` (`id_aluno`),
  CONSTRAINT `FK_tabela_moto_tabela_alunos` FOREIGN KEY (`id_aluno`) REFERENCES `tabela_alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_moto: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela aapm.tabela_pagamento
CREATE TABLE IF NOT EXISTS `tabela_pagamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metodo` enum('C','D','P','A') NOT NULL DEFAULT 'A',
  `valor` float NOT NULL DEFAULT 0,
  `id_aluno` int(11) NOT NULL DEFAULT 0,
  `motivo` enum('A','E','O') NOT NULL DEFAULT 'A',
  `data_pagamento` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_tabela_pagamento_tabela_alunos` (`id_aluno`),
  CONSTRAINT `FK_tabela_pagamento_tabela_alunos` FOREIGN KEY (`id_aluno`) REFERENCES `tabela_alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_pagamento: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela aapm.tabela_reserva_armario
CREATE TABLE IF NOT EXISTS `tabela_reserva_armario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_aluno` int(11) NOT NULL DEFAULT 0,
  `id_armario` int(11) NOT NULL DEFAULT 0,
  `is_ativo` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `FK__tabela_alunos` (`id_aluno`),
  KEY `FK_tabela_reserva_armario_tabela_armario` (`id_armario`),
  CONSTRAINT `FK__tabela_alunos` FOREIGN KEY (`id_aluno`) REFERENCES `tabela_alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tabela_reserva_armario_tabela_armario` FOREIGN KEY (`id_armario`) REFERENCES `tabela_armario` (`numero_armario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_reserva_armario: ~8 rows (aproximadamente)
INSERT INTO `tabela_reserva_armario` (`id`, `id_aluno`, `id_armario`, `is_ativo`) VALUES
	(2, 1, 1, b'1'),
	(3, 2, 2, b'1'),
	(4, 9, 3, b'1'),
	(5, 6, 4, b'1'),
	(6, 3, 5, b'1'),
	(7, 5, 6, b'1'),
	(8, 7, 7, b'1'),
	(9, 8, 8, b'1');

-- Copiando estrutura para tabela aapm.tabela_reserva_estacionamento
CREATE TABLE IF NOT EXISTS `tabela_reserva_estacionamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_aluno` int(11) DEFAULT NULL,
  `id_vaga` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tabela_estacionamento_tabela_alunos` (`id_aluno`),
  KEY `FK_tabela_reserva_estacionamento_tabela_vagas_estacionamento` (`id_vaga`),
  CONSTRAINT `FK_tabela_estacionamento_tabela_alunos` FOREIGN KEY (`id_aluno`) REFERENCES `tabela_alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tabela_reserva_estacionamento_tabela_vagas_estacionamento` FOREIGN KEY (`id_vaga`) REFERENCES `tabela_vagas_estacionamento` (`numero_vaga`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_reserva_estacionamento: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela aapm.tabela_turma
CREATE TABLE IF NOT EXISTS `tabela_turma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `turma` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `periodo` enum('M','V','N','I') DEFAULT NULL,
  `semestre_inicio` enum('1','2') DEFAULT NULL,
  `ano_inicio` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `tabela_turma_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_turma: ~33 rows (aproximadamente)
INSERT INTO `tabela_turma` (`id`, `turma`, `curso_id`, `periodo`, `semestre_inicio`, `ano_inicio`) VALUES
	(1, 'PEF-03-FUA', 1, NULL, NULL, NULL),
	(2, 'PES-04-EJS', 2, NULL, NULL, NULL),
	(3, 'CSTPME225N1', 3, NULL, NULL, NULL),
	(4, 'CSTPME124N4', 3, NULL, NULL, NULL),
	(5, '1NA', 4, NULL, NULL, NULL),
	(6, '2DS', 5, NULL, NULL, NULL),
	(7, '2NA', 4, NULL, NULL, NULL),
	(8, 'ADM1A-SESI', 6, NULL, NULL, NULL),
	(9, 'ADM2A-SESI', 6, NULL, NULL, NULL),
	(10, 'ADM2B-SESI', 6, NULL, NULL, NULL),
	(11, 'DS1A-SESI', 5, NULL, NULL, NULL),
	(12, 'DS1B-SESI', 5, NULL, NULL, NULL),
	(13, 'DS2A-SESI', 5, NULL, NULL, NULL),
	(14, 'DS2B-SESI', 5, NULL, NULL, NULL),
	(15, 'MT1A-SESI', 4, NULL, NULL, NULL),
	(16, 'MT1B-SESI', 4, NULL, NULL, NULL),
	(17, 'MT1-SEDUC', 4, NULL, NULL, NULL),
	(18, 'MT2-SESI', 4, NULL, NULL, NULL),
	(19, 'I1CMFF', 7, NULL, NULL, NULL),
	(20, 'I1PMFF', 8, NULL, NULL, NULL),
	(21, 'M1ADM', 9, NULL, NULL, NULL),
	(22, 'M1ALP', 10, NULL, NULL, NULL),
	(23, 'M1EME', 11, NULL, NULL, NULL),
	(24, 'M2IRET', 12, NULL, NULL, NULL),
	(25, 'M2MM', 13, NULL, NULL, NULL),
	(26, 'M4MM', 13, NULL, NULL, NULL),
	(27, 'T1ADM', 9, NULL, NULL, NULL),
	(28, 'T1EME', 11, NULL, NULL, NULL),
	(29, 'T1SOL', 14, NULL, NULL, NULL),
	(30, 'T2ALP', 10, NULL, NULL, NULL),
	(31, 'T2MM', 13, NULL, NULL, NULL),
	(32, 'T3EME', 11, NULL, NULL, NULL),
	(33, 'T4MM', 13, NULL, NULL, NULL);

-- Copiando estrutura para tabela aapm.tabela_usuario
CREATE TABLE IF NOT EXISTS `tabela_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `senha` varchar(255) DEFAULT NULL,
  `perfil` enum('aluno','admin') DEFAULT 'aluno',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_usuario: ~13 rows (aproximadamente)
INSERT INTO `tabela_usuario` (`id`, `senha`, `perfil`) VALUES
	(1, '$2b$10$pOm8EfdSwbwBYTxB5jBJPeBrLJ0LyhyexBeyo5sGWReOQbMY7mYTG', 'aluno'),
	(2, '$2b$10$QAWIuBlAd9fa.aixNmog6OMUng6B5koOIHUQbtKFym2rsVfskZ6fa', 'admin'),
	(3, '$2b$10$wVTNQ4iP5z8vB3MD70ESUuJ8trJAh3S8thOBVdwzSVZepe/4BOcua', 'aluno'),
	(4, '$2b$10$b7glCXi4t4HjIdG9vF7zU.d4ta4AQgEa449xf9gIaedyUAceXMNe2', 'admin'),
	(5, '$2b$10$PwdNK.dxXtL5RkfU6OjO/ucNQH/gBrx2OxJkhv2toSWy1snCGloZi', 'aluno'),
	(6, '$2b$10$n89LZLy8XsCMeedEE9.Yq.rbPlkKKDTcBzTBRIPZbTyWk3uYc2Nf.', 'admin'),
	(7, '$2b$10$KrQYXvcG1tJWvQscrNeAs.cEPEPorkROSRrA8vWka5DZFQCupl8cO', 'aluno'),
	(8, '$2b$10$WPJLuyjehdZjoRgAvD1KaeQsDs1NHoZylkH8dSs/u8A6zeXj8KI36', 'aluno'),
	(9, '$2b$10$F3ze.TR0oLNn0uXBUW5UIuy1DTsAVAzzBfDZkRvfkVxtgyRKpdL8y', 'aluno'),
	(10, '$2b$10$3J8q5QI6zVzyAaOAHbp3aeCl8yYAH61o12sGeA7gFcqyzNJx38VnC', 'aluno'),
	(11, '$2b$10$uSndVU6V53.ymh7R8koAUO2RbPct9iaElsOjms5TlT456wPB48omW', 'aluno'),
	(12, '$2b$10$Iyq5mw4ecHbHYMs7NMMGuOEj4ZkfDOP.N.V9PUyRlCsywjFiVw0PS', 'aluno'),
	(13, '$2b$10$hhsXWZ26MVoufGcLlLHIZu6OZlVjvntFux8HZuwlTkCFweya4cqVS', 'aluno');

-- Copiando estrutura para tabela aapm.tabela_vagas_estacionamento
CREATE TABLE IF NOT EXISTS `tabela_vagas_estacionamento` (
  `numero_vaga` int(11) NOT NULL AUTO_INCREMENT,
  `estado` enum('D','O','M') NOT NULL DEFAULT 'D',
  PRIMARY KEY (`numero_vaga`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_vagas_estacionamento: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela aapm.tabela_verificacao
CREATE TABLE IF NOT EXISTS `tabela_verificacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `expiracao` datetime NOT NULL,
  `usado` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_verificacao: ~11 rows (aproximadamente)
INSERT INTO `tabela_verificacao` (`id`, `email`, `codigo`, `expiracao`, `usado`) VALUES
	(1, 'teste5@gmail.com', '958552', '2025-12-08 19:47:11', 0),
	(2, 'teste5@gmail.com', '860414', '2025-12-08 19:47:15', 0),
	(3, 'teste5@gmail.com', '575392', '2025-12-08 19:47:24', 0),
	(4, 'teste5@gmail.com', '257519', '2025-12-08 19:47:35', 0),
	(5, 'teste5@gmail.com', '828167', '2025-12-08 19:49:31', 0),
	(6, 'teste5@gmail.com', '450566', '2025-12-08 19:49:50', 0),
	(7, 'teste@gmail.com', '419663', '2025-12-08 19:50:30', 0),
	(8, 'gabs@gmail.com', '132280', '2025-12-08 19:58:47', 0),
	(9, 'gabs@gmail.com', '333157', '2025-12-08 20:01:35', 0),
	(10, 'teste6@gmail.com', '301901', '2025-12-08 20:14:06', 0),
	(11, 'admin@gmail.com', '143878', '2025-12-19 23:43:50', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
