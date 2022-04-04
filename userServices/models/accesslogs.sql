CREATE TABLE `userlogs` (
 `corporateID` varchar(50) NOT NULL,
 `userID` varchar(50) DEFAULT NULL,
 `userName` varchar(50) DEFAULT NULL,
 `Date` date NOT NULL,
 `Time` varchar(100) NOT NULL DEFAULT 'NOT NULL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4