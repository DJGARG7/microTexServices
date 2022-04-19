CREATE TABLE `transactions` (
  `t_id` varchar(36) NOT NULL,
  `t_date` date DEFAULT NULL,
  `uid` varchar(36) DEFAULT NULL,
  `accType` varchar(30) NOT NULL,
  `amount` int(10) DEFAULT NULL,
  `CrDr` varchar(2) DEFAULT NULL,
  `currBal` int(10) NOT NULL,
  `billno` int(5) DEFAULT NULL,
  `remark` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`t_id`);
CREATE TABLE `currbalance` (
  `uid` varchar(36) DEFAULT NULL,
  `balance` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE `currbalance`
  ADD KEY `FK_accID` (`uid`);
ALTER TABLE `currbalance`
  ADD CONSTRAINT `FK_accID` FOREIGN KEY (`uid`) REFERENCES `master_accout` (`uid`);
COMMIT;



