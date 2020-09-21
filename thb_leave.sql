-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2020 at 06:06 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thb_leave`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `username` varchar(30) COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `id` varchar(20) COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `password` varchar(30) COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `permission` varchar(10) COLLATE utf8mb4_thai_520_w2 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_thai_520_w2;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`username`, `id`, `password`, `email`, `permission`) VALUES
('jongrak41', '9', '12345', 'jongrak25418@gmail.com', 'admin'),
('noadmin', '8', '12345', 'general@gmail.com', 'general');

-- --------------------------------------------------------

--
-- Table structure for table `record_approve`
--

CREATE TABLE `record_approve` (
  `Approve_id` int(11) NOT NULL,
  `Submis_date` datetime NOT NULL,
  `Regis_ID` int(11) NOT NULL,
  `leave_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_thai_520_w2;

--
-- Dumping data for table `record_approve`
--

INSERT INTO `record_approve` (`Approve_id`, `Submis_date`, `Regis_ID`, `leave_id`) VALUES
(28, '2020-09-17 16:21:57', 84, 2),
(29, '2020-09-17 16:22:07', 84, 3),
(30, '2020-09-17 16:22:12', 84, 4),
(31, '2020-09-17 16:22:17', 84, 6),
(32, '2020-09-17 16:22:27', 84, 5),
(33, '2020-09-17 16:22:35', 84, 8),
(35, '2020-09-17 16:36:53', 84, 11),
(36, '2020-09-17 17:03:36', 84, 13);

-- --------------------------------------------------------

--
-- Table structure for table `record_leave`
--

CREATE TABLE `record_leave` (
  `leave_id` int(11) NOT NULL,
  `Regis_ID` int(11) NOT NULL,
  `submis_date` datetime NOT NULL,
  `leave_date` datetime NOT NULL,
  `to_date` datetime NOT NULL,
  `category` varchar(10) COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `cause` varchar(255) COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `leave_status` varchar(15) COLLATE utf8mb4_thai_520_w2 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_thai_520_w2;

--
-- Dumping data for table `record_leave`
--

INSERT INTO `record_leave` (`leave_id`, `Regis_ID`, `submis_date`, `leave_date`, `to_date`, `category`, `cause`, `leave_status`) VALUES
(2, 85, '2020-09-14 00:00:00', '2020-09-14 16:46:00', '2785-10-16 16:48:00', 'ลากิจ', 'นอนยาว', 'ผ่านการอนุมัติ'),
(3, 84, '2020-09-14 00:00:00', '2020-09-15 17:01:00', '2020-09-18 17:01:00', 'ลากิจ', 'ไปต่างจังหวัด', 'ผ่านการอนุมัติ'),
(4, 84, '2020-09-14 00:00:00', '2020-09-21 17:11:00', '2020-09-22 17:11:00', 'ลากิจ', 'ปวดท้อง', 'ผ่านการอนุมัติ'),
(5, 84, '2020-09-15 14:39:19', '2020-09-15 14:38:00', '2020-09-26 14:38:00', 'ลาป่วย', 'นอนหลับ', 'ผ่านการอนุมัติ'),
(6, 84, '2020-09-15 14:40:06', '2020-09-15 14:39:00', '2020-09-18 14:39:00', 'ลาป่วย', 'เป็นใข้', 'ผ่านการอนุมัติ'),
(7, 85, '2020-09-16 15:50:13', '2020-09-16 15:49:00', '2020-09-25 15:50:00', 'ลาป่วย', 'นอนอีก', 'รออนุมัติ'),
(8, 84, '2020-09-17 09:42:00', '2020-09-17 09:41:00', '2020-09-17 09:41:00', 'ลาป่วย', 'เป็นไข้หวัด', 'ผ่านการอนุมัติ'),
(10, 84, '2020-09-17 14:42:29', '2020-09-17 14:41:00', '2020-09-22 14:42:00', 'ลาป่วย', 'Go the hell\r\n', 'รออนุมัติ'),
(11, 85, '2020-09-17 16:34:07', '2020-09-01 16:34:07', '9999-09-24 16:37:44', 'ขาดงาน', 'น่าจะหลับยาว', 'ผ่านการอนุมัติ'),
(13, 85, '2020-09-17 17:02:50', '2020-09-17 17:02:00', '8000-09-22 17:02:00', 'ลาพักร้อน', 'ไปต่างโลก', 'ผ่านการอนุมัติ');

-- --------------------------------------------------------

--
-- Stand-in structure for view `record_view`
-- (See below for the actual view)
--
CREATE TABLE `record_view` (
`Regis_ID` int(11)
,`personnel_id` varchar(6)
,`name` varchar(30)
,`surname` varchar(30)
,`name_eng` varchar(30)
,`surname_eng` varchar(30)
,`position` varchar(30)
,`department` varchar(30)
,`email` varchar(50)
,`line_id` varchar(20)
,`tel_number` varchar(15)
,`leave_id` int(11)
,`submis_date` datetime
,`leave_date` datetime
,`to_date` datetime
,`category` varchar(10)
,`cause` varchar(255)
,`leave_status` varchar(15)
);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `Regis_ID` int(11) NOT NULL,
  `personnel_id` varchar(6) COLLATE utf8_thai_520_w2 NOT NULL,
  `name` varchar(30) COLLATE utf8_thai_520_w2 NOT NULL,
  `surname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `name_eng` varchar(30) COLLATE utf8_thai_520_w2 NOT NULL,
  `surname_eng` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `position` varchar(30) COLLATE utf8_thai_520_w2 NOT NULL,
  `department` varchar(30) COLLATE utf8_thai_520_w2 NOT NULL,
  `email` varchar(50) COLLATE utf8_thai_520_w2 NOT NULL,
  `line_id` varchar(20) COLLATE utf8_thai_520_w2 NOT NULL,
  `tel_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `username` varchar(30) COLLATE utf8_thai_520_w2 NOT NULL,
  `password` varchar(100) COLLATE utf8_thai_520_w2 NOT NULL,
  `permission` varchar(10) COLLATE utf8_thai_520_w2 NOT NULL,
  `date_register` datetime DEFAULT NULL,
  `reg_status` varchar(12) COLLATE utf8_thai_520_w2 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`Regis_ID`, `personnel_id`, `name`, `surname`, `name_eng`, `surname_eng`, `position`, `department`, `email`, `line_id`, `tel_number`, `username`, `password`, `permission`, `date_register`, `reg_status`) VALUES
(84, 'p00001', 'จงรักษ์', 'คนรู้', 'jongrak', 'conru', 'Manager', 'IT', 'jongrak25418@gmail.com', 'franky41', '0633141982', 'jongrak41', '$2a$10$tIcihZOoQczV3vhUDT28...e6FdDyVLUQcHPAWibrYBZ8fnkbzlTS', 'admin', '2020-09-14 14:51:03', 'enable'),
(85, 'p00002', 'นพวรรณ', 'ผลนาค', 'noppawan', 'phonnak', 'ทาสแมว', 'IT', 'noppawan.pho@northbkk.ac.th', 'finalwan', '0938150041', 'finalwan', '$2a$10$a0iTiLikdWpzUGRG/PrxoOXIoI8hcVn1NiWObYh8eNqeq5gyLP6x2', 'genneral', '2020-09-14 15:38:17', 'enable'),
(87, 'p00003', 'สมชาย', 'เกียงไกล', 'somchai', 'genggai', 'Manager', 'Marketing', 'som@gmail.com', 'som004', '0984393849', 'somchai', '$2a$10$67mqGbHuf6/20uv8ajh3/OyuYWTvN8fuM.oAbjCFkKh1Nmy4jpxjO', 'general', '2020-09-15 11:01:10', 'enable'),
(97, 'p00004', 'พงศกร', 'พากเพียร', 'Pongsakorn', 'Pakpean', 'Personal', 'Marketing', 'Pongsakorn.pak@gmail.com', 'Gla007', '0981818188', 'glagla8899', '$2a$10$TBPCfEpnEfmMrf60MZbW2uTrq8jO6JbSHn/EOegPXwIi7tTn9Yh5a', 'general', '2020-09-21 10:50:00', 'enable');

-- --------------------------------------------------------

--
-- Structure for view `record_view`
--
DROP TABLE IF EXISTS `record_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `record_view`  AS  select `register`.`Regis_ID` AS `Regis_ID`,`register`.`personnel_id` AS `personnel_id`,`register`.`name` AS `name`,`register`.`surname` AS `surname`,`register`.`name_eng` AS `name_eng`,`register`.`surname_eng` AS `surname_eng`,`register`.`position` AS `position`,`register`.`department` AS `department`,`register`.`email` AS `email`,`register`.`line_id` AS `line_id`,`register`.`tel_number` AS `tel_number`,`record_leave`.`leave_id` AS `leave_id`,`record_leave`.`submis_date` AS `submis_date`,`record_leave`.`leave_date` AS `leave_date`,`record_leave`.`to_date` AS `to_date`,`record_leave`.`category` AS `category`,`record_leave`.`cause` AS `cause`,`record_leave`.`leave_status` AS `leave_status` from (`record_leave` join `register` on(`record_leave`.`Regis_ID` = `register`.`Regis_ID`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `record_approve`
--
ALTER TABLE `record_approve`
  ADD PRIMARY KEY (`Approve_id`),
  ADD UNIQUE KEY `leave_id_unique` (`leave_id`),
  ADD KEY `fk_regis_to_approve` (`Regis_ID`);

--
-- Indexes for table `record_leave`
--
ALTER TABLE `record_leave`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `fk_id_to_regis` (`Regis_ID`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`Regis_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `record_approve`
--
ALTER TABLE `record_approve`
  MODIFY `Approve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `record_leave`
--
ALTER TABLE `record_leave`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `Regis_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `record_approve`
--
ALTER TABLE `record_approve`
  ADD CONSTRAINT `fk_leave_to_approve` FOREIGN KEY (`leave_id`) REFERENCES `record_leave` (`leave_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_regis_to_approve` FOREIGN KEY (`Regis_ID`) REFERENCES `register` (`Regis_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `record_leave`
--
ALTER TABLE `record_leave`
  ADD CONSTRAINT `fk_id_to_regis` FOREIGN KEY (`Regis_ID`) REFERENCES `register` (`Regis_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
