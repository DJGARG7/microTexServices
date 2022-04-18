----------------------------------------------------------------------------------------------------
-- TABLES.
----------------------------------------------------------------------------------------------------

-- GREY_BILLS: Table that holds details regarding bills.

-- Old schema backup.
-- CREATE TABLE `grey_billdetails` (
--  `BillNo` int(10) NOT NULL,
--  `BillDate` date DEFAULT NULL,
--  `accntnames` varchar(100) NOT NULL,
--  `ChallanNo` int(10) NOT NULL,
--  `ChallanDate` date DEFAULT NULL,
--  `NetAmount` int(100) DEFAULT NULL,
--  PRIMARY KEY (`ChallanNo`)
-- );

CREATE TABLE `GREY_BILLS` (
  `billNumber` int(11) NOT NULL,
  `billDate` date NOT NULL,
  `accountID` varchar(36) NOT NULL,
  `billAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `GREY_BILLS`
  ADD PRIMARY KEY (`billNumber`),
  ADD KEY `FKEY_ACCOUNTMASTER` (`accountID`);

ALTER TABLE `GREY_BILLS`
  ADD CONSTRAINT `FKEY_ACCOUNTMASTER` FOREIGN KEY (`accountID`) REFERENCES `accountmaster` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

-- GREY_ITEMS: Table that holds different types of items.

-- Old schema backup.
-- CREATE TABLE `grey_items` (
--  `uuid` varchar(36) NOT NULL,
--  `itemname` varchar(20) NOT NULL,
--  `openingmts` int(10) DEFAULT NULL,
--  `ratepermts` int(10) DEFAULT NULL,
--  PRIMARY KEY (`uuid`)
-- );

CREATE TABLE `GREY_ITEMS` (
  `itemID` int(11) NOT NULL,
  `itemName` varchar(30) NOT NULL,
  `openingMeters` int(11) NOT NULL,
  `rate` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `GREY_ITEMS`
  ADD PRIMARY KEY (`itemID`);

ALTER TABLE `GREY_ITEMS`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
----------------------------------------------------------------------------------------------------
--

-- GREY_ITEM_DETAILS: Table that holds details regarding items in bill. */

-- Old schema backup.
-- CREATE TABLE `grey_itemdetails` (
--  `ChallanNo` int(10) NOT NULL,
--  `itemID` varchar(36) NOT NULL,
--  `ItemName` varchar(100) DEFAULT NULL,
--  `Taka` int(10) NOT NULL,
--  `Mts` decimal(20,2) DEFAULT NULL,
--  `Rate` decimal(20,2) DEFAULT NULL,
--  `Amount` decimal(20,2) DEFAULT NULL,
--  `Discount` decimal(20,2) DEFAULT NULL,
--  PRIMARY KEY (`itemID`),
--  KEY `link` (`ChallanNo`),
--  CONSTRAINT `link` FOREIGN KEY (`ChallanNo`) REFERENCES `grey_billdetails` (`ChallanNo`) ON DELETE CASCADE ON UPDATE NO ACTION
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

CREATE TABLE `GREY_ITEM_DETAILS` (
  `serialNumber` int(11) NOT NULL,
  `billNumber` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `taka` int(11) NOT NULL,
  `meters` int(11) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `GREY_ITEM_DETAILS`
  ADD PRIMARY KEY (`serialNumber`),
  ADD KEY `FKEY_GREY_BILLS` (`billNumber`),
  ADD KEY `FKEY_GREY_ITEMS` (`itemID`);

ALTER TABLE `GREY_ITEM_DETAILS`
  MODIFY `serialNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;  

ALTER TABLE `GREY_ITEM_DETAILS`
  ADD CONSTRAINT `FKEY_GREY_BILLS` FOREIGN KEY (`billNumber`) REFERENCES `GREY_BILLS` (`billNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_GREY_ITEMS` FOREIGN KEY (`itemID`) REFERENCES `GREY_ITEMS` (`itemID`) ON DELETE CASCADE ON UPDATE CASCADE;  

--
----------------------------------------------------------------------------------------------------
--

-- GREY_TAKA_DETAILS: Table that holds taka details of each item.

-- Old schema backup.
-- CREATE TABLE `grey_takadetails` (
--  `itemID` varchar(36) NOT NULL,
--  `Mts` int(10) NOT NULL,
--  KEY `itemtotaka` (`itemID`),
--  CONSTRAINT `itemtotaka` FOREIGN KEY (`itemID`) REFERENCES `grey_itemdetails` (`itemID`) ON DELETE CASCADE
-- );

CREATE TABLE `GREY_TAKA_DETAILS` (
  `takaID` int(11) NOT NULL,
  `billNumber` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `meters` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `GREY_TAKA_DETAILS`
  ADD PRIMARY KEY (`takaID`),
  ADD KEY `FKEY_BILLS_TAKA` (`billNumber`),
  ADD KEY `FKEY_GREY_ITEMS_TAKA` (`itemID`);

ALTER TABLE `GREY_TAKA_DETAILS`
  MODIFY `takaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

ALTER TABLE `GREY_TAKA_DETAILS`
  ADD CONSTRAINT `FKEY_BILLS_TAKA` FOREIGN KEY (`billNumber`) REFERENCES `GREY_BILLS` (`billNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_GREY_ITEMS_TAKA` FOREIGN KEY (`itemID`) REFERENCES `GREY_ITEMS` (`itemID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

----------------------------------------------------------------------------------------------------
-- VIEWS.
----------------------------------------------------------------------------------------------------

-- Old views backup.
-- CREATE VIEW grey_bills AS SELECT * FROM grey_billdetails NATURAL JOIN grey_itemdetails;

-- GREY_PURCHASES
CREATE VIEW GREY_PURCHASES AS 
SELECT billNumber, AccName, billDate, itemName, taka, meters, GREY_ITEM_DETAILS.rate, amount, discount FROM 
GREY_BILLS NATURAL JOIN GREY_ITEM_DETAILS INNER JOIN accountmaster INNER JOIN GREY_ITEMS 
WHERE GREY_BILLS.accountID = accountmaster.uid AND GREY_ITEM_DETAILS.itemID = GREY_ITEMS.itemID;

-- GREY_INVENTORY
CREATE VIEW GREY_INVENTORY AS 
SELECT itemID, itemName, AccName AS supplier, SUM(meters) AS meters FROM 
GREY_BILLS NATURAL JOIN GREY_TAKA_DETAILS NATURAL JOIN GREY_ITEMS INNER JOIN accountmaster 
WHERE accountmaster.uid = accountID GROUP BY itemName;