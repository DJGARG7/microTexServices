CREATE TABLE `master_userlogs` (
 `corporateID` varchar(50) NOT NULL,
 `userID` varchar(50) DEFAULT NULL,
 `userName` varchar(50) DEFAULT NULL,
 `loginDate` date NOT NULL,
 `loginTime` varchar(100) NOT NULL DEFAULT 'NOT NULL'
);