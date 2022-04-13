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
);

/*table that holds details regarding items
*/

CREATE TABLE `grey_itemdetails` (
 `ChallanNo` int(10) NOT NULL,
 `itemID` varchar(36) NOT NULL,
 `ItemName` varchar(100) DEFAULT NULL,
 `Taka` int(10) NOT NULL,
 `Mts` decimal(20,2) DEFAULT NULL,
 `Rate` decimal(20,2) DEFAULT NULL,
 `Amount` decimal(20,2) DEFAULT NULL,
 `Discount` decimal(20,2) DEFAULT NULL,
 PRIMARY KEY (`itemID`),
 KEY `link` (`ChallanNo`),
 CONSTRAINT `link` FOREIGN KEY (`ChallanNo`) REFERENCES `grey_billdetails` (`ChallanNo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

/*table that holds different types of items
*/
CREATE TABLE `grey_items` (
 `uuid` varchar(36) NOT NULL,
 `itemname` varchar(20) NOT NULL,
 `openingmts` int(10) DEFAULT NULL,
 `ratepermts` int(10) DEFAULT NULL,
 PRIMARY KEY (`uuid`)
);

/*table that holds taka details of each item
*/
CREATE TABLE `grey_takadetails` (
 `itemID` varchar(36) NOT NULL,
 `Mts` int(10) NOT NULL,
 KEY `itemtotaka` (`itemID`),
 CONSTRAINT `itemtotaka` FOREIGN KEY (`itemID`) REFERENCES `grey_itemdetails` (`itemID`) ON DELETE CASCADE
);


/*Creating a view of the first two tables*/
CREATE VIEW grey_bills AS SELECT * FROM grey_billdetails NATURAL JOIN grey_itemdetails;