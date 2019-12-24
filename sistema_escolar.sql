-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 23-Dez-2019 às 22:08
-- Versão do servidor: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistema_escolar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamadas_em_sala`
--

CREATE TABLE `chamadas_em_sala` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `date_day` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `disciplina` varchar(255) NOT NULL,
  `code_professor` varchar(255) NOT NULL,
  `code_aluno` varchar(255) NOT NULL,
  `presente` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `chamadas_em_sala`
--

INSERT INTO `chamadas_em_sala` (`id`, `date`, `date_day`, `curso`, `disciplina`, `code_professor`, `code_aluno`, `presente`) VALUES
(1, '23-12-2019', '23-12-2019', 'Informática Básica', 'História', '123654987', '741', ''),
(2, '23-12-2019', '23-12-2019', 'Ciência da computação', 'Português', '75369', '741', ''),
(3, '23-12-2019', '23-12-2019', 'Pedagogia ', 'Química', '87415978', '0321', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `confirma_entrada_de_alunos`
--

CREATE TABLE `confirma_entrada_de_alunos` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `data_hoje` varchar(255) NOT NULL,
  `porteiro` varchar(255) NOT NULL,
  `code_aluno` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `confirma_entrada_de_alunos`
--

INSERT INTO `confirma_entrada_de_alunos` (`id`, `date`, `data_hoje`, `porteiro`, `code_aluno`) VALUES
(1, '28/08/2014 13:32:50', '28/08/2014', '123', '0321'),
(2, '28/08/2014 13:36:02', '28/08/2014', '123', '321654'),
(3, '28/08/2014 13:51:18', '28/08/2014', '963258', '741'),
(5, '23/12/2019 13:03:56', '23/12/2019', '123', '741'),
(6, '23/12/2019 13:13:06', '23/12/2019', '123', '741');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `curso` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cursos`
--

INSERT INTO `cursos` (`id`, `curso`) VALUES
(1, '1º ensino médio G'),
(2, 'Informática Básica'),
(3, 'Nutrição');

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplinas`
--

CREATE TABLE `disciplinas` (
  `id` int(11) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `disciplina` varchar(255) NOT NULL,
  `professor` varchar(255) NOT NULL,
  `sala` varchar(255) NOT NULL,
  `turno` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `disciplinas`
--

INSERT INTO `disciplinas` (`id`, `curso`, `disciplina`, `professor`, `sala`, `turno`) VALUES
(1, '1º ensino médio G', 'História', '87415978', '01', 'Manhã'),
(2, '1º ensino médio G', 'Português', '87415978', '01', 'Manhã'),
(3, '1º ensino médio G', 'Quimica', '87415978', '01', 'Manhã'),
(4, '1º ensino médio G', 'Física', '87415978', '01', 'Manhã'),
(5, '1º ensino médio G', 'Geografia', '87415978', '01', 'Manhã'),
(6, '1º ensino médio G', 'Matemática', '87415978', '01', 'Manhã'),
(8, '1º ensino médio G', 'Filosofia', '87415978', '01', 'Manhã'),
(9, '1º ensino médio G', 'Sociologia', '87415978', '01', 'Manhã');

-- --------------------------------------------------------

--
-- Estrutura da tabela `estudantes`
--

CREATE TABLE `estudantes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `rg` varchar(255) NOT NULL,
  `mae` varchar(255) NOT NULL,
  `pai` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `telefone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `estudantes`
--

INSERT INTO `estudantes` (`id`, `nome`, `code`, `status`, `cpf`, `rg`, `mae`, `pai`, `cidade`, `bairro`, `telefone`) VALUES
(2, 'Larissa S. ', '741', 'Ativo', '369', '852', 'Fernanda S.', 'Roberto S.', 'Juazeiro', 'Pe. Cicero', 85225555),
(3, 'Roberta Amorin', '321654', 'Ativo', '0000000', '0000000', 'Eliene Amorin', 'José Amorin', 'Iguatu', 'Santo Antonio', 2222222);

-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `painel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `login`
--

INSERT INTO `login` (`id`, `status`, `code`, `senha`, `nome`, `painel`) VALUES
(0, 'Ativo', '322398', '', '', 'Aluno'),
(2, 'Ativo', '963258', '963258', 'Cleiton', 'aluno'),
(3, 'Ativo', '123', '123', 'Cicero', 'portaria'),
(4, 'Ativo', '0789', '0789', 'Adriano', 'professor'),
(5, 'Ativo', '0654', '0654', 'Julia', 'professor'),
(6, 'Ativo', '123654987', '123', 'Socorro', 'professor');

-- --------------------------------------------------------

--
-- Estrutura da tabela `professores`
--

CREATE TABLE `professores` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `nascimento` varchar(255) NOT NULL,
  `formacao` varchar(255) NOT NULL,
  `graduacao` varchar(255) NOT NULL,
  `pos_graduacao` varchar(255) NOT NULL,
  `mestrado` varchar(255) NOT NULL,
  `doutorado` varchar(255) NOT NULL,
  `salario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `professores`
--

INSERT INTO `professores` (`id`, `code`, `status`, `nome`, `cpf`, `nascimento`, `formacao`, `graduacao`, `pos_graduacao`, `mestrado`, `doutorado`, `salario`) VALUES
(4, '123654987', 'Ativo', 'Socorro', '9999999', '03-05-73', 'Superior Completo', 'História', '', '', '', '2950'),
(5, '123655732', 'Ativo', 'Julia', '354126', '20-11-94', 'Superior Completo', '', '', '', '', '3000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chamadas_em_sala`
--
ALTER TABLE `chamadas_em_sala`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirma_entrada_de_alunos`
--
ALTER TABLE `confirma_entrada_de_alunos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estudantes`
--
ALTER TABLE `estudantes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `professores`
--
ALTER TABLE `professores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chamadas_em_sala`
--
ALTER TABLE `chamadas_em_sala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `confirma_entrada_de_alunos`
--
ALTER TABLE `confirma_entrada_de_alunos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `estudantes`
--
ALTER TABLE `estudantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `professores`
--
ALTER TABLE `professores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
