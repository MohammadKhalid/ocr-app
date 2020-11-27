-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2020 at 02:48 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ocr`
--
CREATE DATABASE IF NOT EXISTS `ocr` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ocr`;

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(128) NOT NULL,
  `image` blob NOT NULL,
  `data` varchar(2048) NOT NULL,
  `date` varchar(1028) NOT NULL,
  `currency` varchar(1028) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`id`, `image`, `data`, `date`, `currency`) VALUES
(10, '', 'This translation was prepared by Lloyd Kramer. Kramer graduated from the\nUniversity of California, Berkeley, with a major in Russian. He is also a graduate of the US.\nNavy Foreign Language School in Boulder, Colorado. While a student at Berkeley he Was\npresident of Dobro Slovo, the Slavic language honor society. As a naval officer during World\nWar H he served as both interpreter and translator in Russian for the U.S. Navy. After the\nWar, Kramer worked for a year as an analyst in Washington, DC. Subsequent to this\nassignment, he joined the staff of the Hoover Institute and Library, Stanford University,\nwhere he helped organize and catalog the lnstitute’s large collection of Slavic language non-\nbook materials.\n\nMr. Kramer now resides, with his wife Martha, in Twain Harte, California\nFebruary 23, 2000\n\n', 'null', 'null'),
(11, '', '', '18-05-2020,14-07-2019', '$10,$50,Rs.1000,£15'),
(12, '', '', 'null', 'null'),
(13, '', '', 'null', '$11.99,$10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
