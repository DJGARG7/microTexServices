----------------------------------------------------------------------------------------------------
-- TABLES.
----------------------------------------------------------------------------------------------------

-- GREY_BILLS: Table that holds details regarding bills.

CREATE TABLE `grey_bills` (
  `billNumber` int(11) NOT NULL,
  `billDate` date NOT NULL,
  `accountID` varchar(36) NOT NULL,
  `billAmount` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `grey_bills`
  ADD PRIMARY KEY (`billNumber`),
  ADD KEY `FKEY_ACCOUNTMASTER` (`accountID`);

ALTER TABLE `grey_bills`
  ADD CONSTRAINT `FKEY_ACCOUNTMASTER` FOREIGN KEY (`accountID`) REFERENCES `master_account` (`uid`) ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

-- GREY_ITEMS: Table that holds different types of items.

CREATE TABLE `grey_items` (
  `itemID` int(11) NOT NULL,
  `itemName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `grey_items`
ADD PRIMARY KEY (`itemID`);

ALTER TABLE `grey_items`
MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
----------------------------------------------------------------------------------------------------
--

-- GREY_ITEM_DETAILS: Table that holds details regarding items in bill. */

CREATE TABLE `grey_bill_details` (
  `serialNumber` int(11) NOT NULL,
  `billNumber` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `taka` int(11) NOT NULL,
  `meters` int(11) NOT NULL,
  `remTaka` int(11) NOT NULL,
  `remMeters` int(11) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `grey_bill_details`
  ADD PRIMARY KEY (`serialNumber`),
  ADD KEY `FKEY_GREY_BILLS` (`billNumber`),
  ADD KEY `FKEY_GREY_ITEMS` (`itemID`);

ALTER TABLE `grey_bill_details`
  MODIFY `serialNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

ALTER TABLE `grey_bill_details`
  ADD CONSTRAINT `FKEY_GREY_BILLS` FOREIGN KEY (`billNumber`) REFERENCES `grey_bills` (`billNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_GREY_ITEMS` FOREIGN KEY (`itemID`) REFERENCES `grey_items` (`itemID`) ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

-- GREY_TAKA_DETAILS: Table that holds taka details of each item.

CREATE TABLE `grey_taka_details` (
  `takaID` int(11) NOT NULL,
  `billNumber` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `meters` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `grey_taka_details`
  ADD PRIMARY KEY (`takaID`),
  ADD KEY `FKEY_BILLS_TAKA` (`billNumber`),
  ADD KEY `FKEY_ITEMS_GREY_TAKA` (`itemID`);

ALTER TABLE `grey_taka_details`
  MODIFY `takaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

ALTER TABLE `grey_taka_details`
  ADD CONSTRAINT `FKEY_BILLS_TAKA` FOREIGN KEY (`billNumber`) REFERENCES `grey_bills` (`billNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_ITEMS_GREY_TAKA` FOREIGN KEY (`itemID`) REFERENCES `grey_items` (`itemID`) ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

----------------------------------------------------------------------------------------------------
-- VIEWS.
----------------------------------------------------------------------------------------------------

-- GREY_PURCHASES
CREATE VIEW grey_purchases AS 
SELECT billNumber, AccName, billDate, itemName, taka, meters, grey_bill_details.rate, amount, discount FROM 
grey_bills NATURAL JOIN grey_bill_details INNER JOIN master_account INNER JOIN grey_items 
WHERE grey_bills.accountID = master_account.uid AND grey_bill_details.itemID = grey_items.itemID;

-- GREY_INVENTORY
CREATE VIEW grey_inventory AS 
SELECT itemID, itemName, AccName AS supplier, SUM(meters) AS meters FROM 
grey_bills NATURAL JOIN grey_taka_details NATURAL JOIN grey_items INNER JOIN master_account 
WHERE master_account.uid = accountID GROUP BY itemName, supplier, meters;