CREATE TABLE `generalpurchase` (
 `uuid` varchar(36) NOT NULL,
 `itemname` varchar(50) NOT NULL,
 `quantity` int(10) NOT NULL,
 `priceperqty` int(10) NOT NULL,
 `totalamount` int(15) NOT NULL,
 PRIMARY KEY (`uuid`)
);