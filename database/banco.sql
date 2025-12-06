-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.8.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
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
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_admin: ~1 rows (aproximadamente)
INSERT INTO `tabela_admin` (`id`, `nome`, `email`, `telefone`, `criado_em`) VALUES
	(1, 'bia', 'bia@gmail.com', '11988665544', '2025-12-05 15:39:59');

-- Copiando estrutura para tabela aapm.tabela_aluno
CREATE TABLE IF NOT EXISTS `tabela_aluno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CPF` varchar(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `matricula` char(50) DEFAULT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `armario_id` int(11) NOT NULL,
  `data_encerramento` date DEFAULT NULL,
  `pagamento` enum('C','D','P','A') NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `armario_id` (`armario_id`),
  UNIQUE KEY `matricula` (`matricula`) USING BTREE,
  UNIQUE KEY `CPF` (`CPF`),
  KEY `curso_id` (`curso_id`),
  KEY `tabela_armario_ibfk_2` (`armario_id`),
  KEY `tabela_usuario_ibfk_3` (`turma_id`),
  CONSTRAINT `tabela_aluno_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`),
  CONSTRAINT `tabela_aluno_ibfk_3` FOREIGN KEY (`turma_id`) REFERENCES `tabela_turma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tabela_armario_ibfk_2` FOREIGN KEY (`armario_id`) REFERENCES `tabela_armario` (`numero_armario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_aluno: ~2 rows (aproximadamente)
INSERT INTO `tabela_aluno` (`id`, `CPF`, `nome`, `matricula`, `telefone`, `email`, `curso_id`, `turma_id`, `armario_id`, `data_encerramento`, `pagamento`, `criado_em`) VALUES
	(1, '55522233311', 'Gabs', '3321', '11988877766', 'gabs@gmail.com', 10, 22, 1, NULL, 'A', '2025-12-05 15:22:18'),
	(2, '55522233322', 'admin', '1111', '11988877766', 'admin@gmail.com', 5, 6, 2, NULL, 'P', '2025-12-05 15:22:18');

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
	(3, 'D', NULL),
	(4, 'D', NULL),
	(5, 'D', NULL),
	(6, 'D', NULL),
	(7, 'D', NULL),
	(8, 'D', NULL),
	(9, 'D', NULL),
	(10, 'D', NULL),
	(11, 'D', NULL),
	(12, 'D', NULL),
	(13, 'M', NULL),
	(14, 'M', NULL),
	(15, 'D', NULL),
	(16, 'M', NULL),
	(17, 'M', NULL),
	(18, 'D', NULL),
	(19, 'M', NULL),
	(20, 'O', NULL),
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
	(50, 'O', NULL),
	(51, 'D', NULL),
	(52, 'D', NULL),
	(53, 'D', NULL),
	(54, 'O', NULL),
	(55, 'M', NULL),
	(56, 'M', NULL),
	(57, 'O', NULL),
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
	(69, 'O', NULL),
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
	(90, 'O', NULL),
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
	(110, 'O', NULL),
	(111, 'D', NULL),
	(112, 'M', NULL),
	(113, 'M', NULL),
	(114, 'M', NULL),
	(115, 'D', NULL),
	(116, 'D', NULL),
	(117, 'M', NULL),
	(118, 'D', NULL),
	(119, 'D', NULL),
	(120, 'O', NULL),
	(121, 'M', NULL),
	(122, 'M', NULL),
	(123, 'D', NULL),
	(124, 'O', NULL),
	(125, 'D', NULL),
	(126, 'O', NULL),
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
	(138, 'O', NULL),
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
	(153, 'O', NULL),
	(154, 'M', NULL),
	(155, 'M', NULL),
	(156, 'D', NULL),
	(157, 'M', NULL),
	(158, 'O', NULL),
	(159, 'O', NULL),
	(160, 'D', NULL),
	(161, 'D', NULL),
	(162, 'D', NULL),
	(163, 'D', NULL),
	(164, 'D', NULL),
	(165, 'D', NULL),
	(166, 'D', NULL),
	(167, 'M', NULL),
	(168, 'O', NULL),
	(169, 'M', NULL),
	(170, 'M', NULL),
	(171, 'D', NULL),
	(172, 'M', NULL),
	(173, 'M', NULL),
	(174, 'M', NULL),
	(175, 'M', NULL),
	(176, 'O', NULL);

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
  `id_aluno` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `perfil` enum('aluno','admin') DEFAULT 'aluno',
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`id_aluno`) USING BTREE,
  KEY `FK_tabela_usuario_tabela_admin` (`id_admin`),
  CONSTRAINT `FK_tabela_usuario_tabela_admin` FOREIGN KEY (`id_admin`) REFERENCES `tabela_admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tabela_usuario_tabela_aluno` FOREIGN KEY (`id_aluno`) REFERENCES `tabela_aluno` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela aapm.tabela_usuario: ~2 rows (aproximadamente)
INSERT INTO `tabela_usuario` (`id`, `id_aluno`, `id_admin`, `senha`, `perfil`) VALUES
	(1, 1, NULL, '$2b$10$v5EVCSuk/jwODOZSdlvK9uLxXUyWFmOjlowNKwboNKOYN2DhXgPpq', 'aluno'),
	(2, 2, NULL, '$2b$10$lBsQpIQqr9AdMR2nMxrkReiXWARvevdsMvbNboMiFonT8fZSYxGFi', 'admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
