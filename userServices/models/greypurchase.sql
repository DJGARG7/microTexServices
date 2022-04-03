/* table that holds details regarding bill
*/

CREATE TABLE `billdetails` (
 `BillNo` int(10) NOT NULL,
 `BillDate` date DEFAULT NULL,
 `accntnames` varchar(100) NOT NULL,
 `ChallanNo` int(10) DEFAULT NULL,
 `ChallanDate` date DEFAULT NULL,
 `Agent` varchar(10) DEFAULT NULL,
 `EntryNo` int(10) DEFAULT NULL,
 `NetAmount` int(10) DEFAULT NULL,
 PRIMARY KEY (`BillNo`)
); 

/*table that holds details regarding items
*/

CREATE TABLE `itemdetails` (
 `BillNo` int(10) NOT NULL,
 `ItemName` varchar(100) DEFAULT NULL,
 `Marka` decimal(20,2) DEFAULT NULL,
 `Taka` int(10) DEFAULT NULL,
 `Mts` decimal(20,2) DEFAULT NULL,
 `Fold` int(20) DEFAULT NULL,
 `ActMts` decimal(20,2) DEFAULT NULL,
 `Rate` decimal(20,2) DEFAULT NULL,
 `Amount` decimal(20,2) DEFAULT NULL,
 `Discount` decimal(20,2) DEFAULT NULL,
 `IGST` decimal(20,2) DEFAULT NULL,
 `CGST` decimal(20,2) DEFAULT NULL,
 `SGST` decimal(20,2) DEFAULT NULL,
 KEY `BillNo` (`BillNo`),
 CONSTRAINT `test` FOREIGN KEY (`BillNo`) REFERENCES `billdetails` (`BillNo`) ON DELETE CASCADE ON UPDATE NO ACTION
);

/*table that holds different types of items
*/
CREATE TABLE `items` (
 `itemname` varchar(20) NOT NULL,
 `openingpcs` int(10) DEFAULT NULL,
 `openingmts` int(10) DEFAULT NULL,
 `currentmts` int(10) DEFAULT NULL,
 `openingval` int(10) DEFAULT NULL,
 `rateperpcs` int(10) DEFAULT NULL,
 `ratepermts` int(10) DEFAULT NULL,
 `hsncode` int(10) DEFAULT NULL,
 `gst` int(10) DEFAULT NULL,
 `descriptiongst` varchar(100) DEFAULT NULL
);
