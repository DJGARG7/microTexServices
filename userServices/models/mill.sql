----------------------------------------------------------------------------------------------------
-- TABLES.
----------------------------------------------------------------------------------------------------

-- MILL_CHALLAN: Table that stores mill challans.

CREATE TABLE `MILL_CHALLAN` (
  `challanNumber` int(11) NOT NULL,
  `challanDate` date NOT NULL,
  `supplierID` varchar(36) NOT NULL,
  `itemID` int(11) NOT NULL,
  `millID` varchar(36) NOT NULL,
  `sentMeters` int(11) NOT NULL,
  `sentTaka` int(11) NOT NULL,
  `pendingMeters` int(11) NOT NULL,
  `pendingTaka` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `MILL_CHALLAN`
ADD PRIMARY KEY (`challanNumber`),
ADD KEY `FKEY_ITEMS_MILL_CHALLAN` (`itemID`),
ADD KEY `FKEY_SUPPLIER_MILL_CHALLAN` (`supplierID`),
ADD KEY `FKEY_MILL_MILL_CHALLAN` (`millID`);

ALTER TABLE `MILL_CHALLAN`
ADD CONSTRAINT `FKEY_ITEMS_MILL_CHALLAN` FOREIGN KEY (`itemID`) REFERENCES `GREY_ITEMS` (`itemID`) ON UPDATE CASCADE,
ADD CONSTRAINT `FKEY_MILL_MILL_CHALLAN` FOREIGN KEY (`millID`) REFERENCES `master_account` (`uid`) ON UPDATE CASCADE,
ADD CONSTRAINT `FKEY_SUPPLIER_MILL_CHALLAN` FOREIGN KEY (`supplierID`) REFERENCES `master_account` (`uid`) ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

-- MILL_TAKA_DETAILS: Table that stores taka details of items sent to mill.

CREATE TABLE `MILL_TAKA_DETAILS` (
  `takaID` int(11) NOT NULL,
  `challanNumber` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `meters` int(11) NOT NULL,
  `isPending` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `MILL_TAKA_DETAILS`
ADD PRIMARY KEY (`takaID`),
ADD KEY `FKEY_ITEMS_MILL_TAKA` (`itemID`),
ADD KEY `FKEY_MILL_CHALLAN` (`challanNumber`);

ALTER TABLE `MILL_TAKA_DETAILS`
MODIFY `takaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `MILL_TAKA_DETAILS`
ADD CONSTRAINT `FKEY_ITEMS_MILL_TAKA` FOREIGN KEY (`itemID`) REFERENCES `GREY_ITEMS` (`itemID`) ON UPDATE CASCADE,
ADD CONSTRAINT `FKEY_MILL_CHALLAN` FOREIGN KEY (`challanNumber`) REFERENCES `MILL_CHALLAN` (`challanNumber`) ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

----------------------------------------------------------------------------------------------------
-- VIEWS.
----------------------------------------------------------------------------------------------------