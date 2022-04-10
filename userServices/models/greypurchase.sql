/* table that holds details regarding bill
*/

CREATE TABLE `grey_billdetails` (
 `BillNo` int(10) NOT NULL,
 `BillDate` date DEFAULT NULL,
 `accntnames` varchar(100) NOT NULL,
 `ChallanNo` int(10) NOT NULL,
 `ChallanDate` date DEFAULT NULL,
 `NetAmount` int(100) DEFAULT NULL,
 PRIMARY KEY (`ChallanNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

/*table that holds details regarding items
*/

CREATE TABLE `grey_itemdetails` (
 `ChallanNo` int(10) NOT NULL,
 `ItemName` varchar(100) DEFAULT NULL,
 `Mts` decimal(20,2) DEFAULT NULL,
 `Rate` decimal(20,2) DEFAULT NULL,
 `Amount` decimal(20,2) DEFAULT NULL,
 `Discount` decimal(20,2) DEFAULT NULL,
 KEY `link` (`ChallanNo`),
 CONSTRAINT `link` FOREIGN KEY (`ChallanNo`) REFERENCES `grey_billdetails` (`ChallanNo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

/*table that holds different types of items
*/
CREATE TABLE `grey_items` (
 `itemname` varchar(20) NOT NULL,
 `openingpcs` int(10) DEFAULT NULL,
 `openingmts` int(10) DEFAULT NULL,
 `openingval` int(10) DEFAULT NULL,
 `rateperpcs` int(10) DEFAULT NULL,
 `ratepermts` int(10) DEFAULT NULL,
 `hsncode` int(10) DEFAULT NULL,
 `gst` int(10) DEFAULT NULL,
 `descriptiongst` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


/*Creating a view of the first two tables*/
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usermodule`.`grey_bills` AS select `usermodule`.`grey_billdetails`.`ChallanNo` AS `ChallanNo`,`usermodule`.`grey_billdetails`.`BillNo` AS `BillNo`,`usermodule`.`grey_billdetails`.`BillDate` AS `BillDate`,`usermodule`.`grey_billdetails`.`accntnames` AS `accntnames`,`usermodule`.`grey_billdetails`.`ChallanDate` AS `ChallanDate`,`usermodule`.`grey_billdetails`.`NetAmount` AS `NetAmount`,`usermodule`.`grey_itemdetails`.`ItemName` AS `ItemName`,`usermodule`.`grey_itemdetails`.`Mts` AS `Mts`,`usermodule`.`grey_itemdetails`.`Rate` AS `Rate`,`usermodule`.`grey_itemdetails`.`Amount` AS `Amount`,`usermodule`.`grey_itemdetails`.`Discount` AS `Discount` from (`usermodule`.`grey_billdetails` join `usermodule`.`grey_itemdetails` on(`usermodule`.`grey_billdetails`.`ChallanNo` = `usermodule`.`grey_itemdetails`.`ChallanNo`))
