-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 22, 2022 at 10:42 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `microtex`
--

-- --------------------------------------------------------

--
-- Table structure for table `Firm`
--

CREATE TABLE `Firm` (
  `uuid` varchar(36) NOT NULL,
  `corporate_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Permissions`
--

CREATE TABLE `Permissions` (
  `p_id` int(11) NOT NULL,
  `p_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Permissions`
--

INSERT INTO `Permissions` (`p_id`, `p_name`) VALUES
(1, 'Grey Purchase'),
(2, 'General Purchase'),
(3, 'Send to Mill'),
(4, 'Receive from Mill'),
(5, 'Sale Challan'),
(6, 'Sale Billing'),
(7, 'Display Bills'),
(8, 'Send For Job'),
(9, 'Receive From Job'),
(13, 'Balance Sheet');

-- --------------------------------------------------------

--
-- Table structure for table `Proprietor`
--

CREATE TABLE `Proprietor` (
  `uuid` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `UserPermissions`
--

CREATE TABLE `UserPermissions` (
  `uuid` varchar(36) NOT NULL,
  `p_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `UserPermissions`
--

INSERT INTO `UserPermissions` (`uuid`, `p_id`) VALUES
('470b43e9-a7a5-11ec-bbf0-dce994159939', 1),
('470b43e9-a7a5-11ec-bbf0-dce994159939', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Firm`
--
ALTER TABLE `Firm`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `Proprietor`
--
ALTER TABLE `Proprietor`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `UserPermissions`
--
ALTER TABLE `UserPermissions`
  ADD KEY `P_ID_FKEY` (`p_id`),
  ADD KEY `UUID_FKEY` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Dumping data for table `Permissions`
--

INSERT INTO `Permissions` (`p_id`, `p_name`) VALUES
(1, 'Grey Purchase'),
(2, 'General Purchase'),
(3, 'Send to Mill'),
(4, 'Receive from Mill'),
(5, 'Sale Challan'),
(6, 'Sale Billing'),
(7, 'Display Bills');

--
-- Constraints for table `UserPermissions`
--
ALTER TABLE `UserPermissions`
  ADD CONSTRAINT `P_ID_FKEY` FOREIGN KEY (`p_id`) REFERENCES `Permissions` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UUID_FKEY` FOREIGN KEY (`uuid`) REFERENCES `Firm` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;