----------------------------------------------------------------------------------------------------
-- TABLES.
----------------------------------------------------------------------------------------------------

-- MILL_CHALLAN: Table that stores mill challans.

CREATE TABLE `mill_challan` (
  `challanNumber` int(11) NOT NULL,
  `greyBillNumber` int(11) NOT NULL,
  `millID` varchar(36) NOT NULL,
  `itemID` int(11) NOT NULL,
  `sentDate` date NOT NULL,
  `receiveDate` date DEFAULT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `mill_challan`
  ADD PRIMARY KEY (`challanNumber`),
  ADD KEY `FKEY_ACCOUNT_MILL_CHALLAN` (`millID`),
  ADD KEY `FKEY_GREY_BILLS_MILL_CHALLAN` (`greyBillNumber`),
  ADD KEY `FKEY_GREY_ITEMS_MILL` (`itemID`);

ALTER TABLE `mill_challan`
  ADD CONSTRAINT `FKEY_ACCOUNT_MILL_CHALLAN` FOREIGN KEY (`millID`) REFERENCES `master_account` (`uid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_GREY_BILLS_MILL_CHALLAN` FOREIGN KEY (`greyBillNumber`) REFERENCES `grey_bills` (`billNumber`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_GREY_ITEMS_MILL` FOREIGN KEY (`itemID`) REFERENCES `grey_items` (`itemID`) ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

-- MILL_CHALLAN_DETAILS: Table that stores challan details.

CREATE TABLE `mill_challan_details` (
  `serialNumber` int(11) NOT NULL,
  `challanNumber` int(11) NOT NULL,
  `sentTaka` int(11) NOT NULL,
  `sentMeters` int(11) NOT NULL,
  `receivedTaka` int(11) NOT NULL,
  `receivedMeters` int(11) NOT NULL,
  `millLoss` int(11) DEFAULT NULL,
  `pieceLoss` int(11) DEFAULT NULL,
  `rate` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `mill_challan_details`
  ADD PRIMARY KEY (`serialNumber`),
  ADD KEY `FKEY_MILL_CHALLAN` (`challanNumber`);

ALTER TABLE `mill_challan_details`
  MODIFY `serialNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `mill_challan_details`
  ADD CONSTRAINT `FKEY_MILL_CHALLAN` FOREIGN KEY (`challanNumber`) REFERENCES `mill_challan` (`challanNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

-- MILL_TAKA_DETAILS: Table that stores taka details of items sent to mill.

CREATE TABLE `mill_taka_details` (
  `takaID` int(11) NOT NULL,
  `challanNumber` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `meters` int(11) NOT NULL,
  `isPending` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `mill_taka_details`
  ADD PRIMARY KEY (`takaID`),
  ADD KEY `FKEY_ITEMS_MILL_TAKA` (`itemID`),
  ADD KEY `FKEY_MILL_CHALLAN_TAKA` (`challanNumber`);

ALTER TABLE `mill_taka_details`
  MODIFY `takaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `mill_taka_details`
  ADD CONSTRAINT `FKEY_ITEMS_MILL_TAKA` FOREIGN KEY (`itemID`) REFERENCES `grey_items` (`itemID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_MILL_CHALLAN_TAKA` FOREIGN KEY (`challanNumber`) REFERENCES `mill_challan` (`challanNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
----------------------------------------------------------------------------------------------------
--

----------------------------------------------------------------------------------------------------
-- VIEWS.
----------------------------------------------------------------------------------------------------