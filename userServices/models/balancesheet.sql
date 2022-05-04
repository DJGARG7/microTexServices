CREATE VIEW `bs1` AS 
SELECT `currbalance`.`uid` AS `uid`, `currbalance`.`balance` AS `balance`, `master_account`.`AccName` AS `AccName`, `master_account`.`AccType` AS `AccType` 
FROM (`currbalance` join `master_account` ON (`currbalance`.`uid` = `master_account`.`uid`));