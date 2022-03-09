CREATE DATABASE ADMINDASHBOARD;

CREATE TABLE `accountmaster` (
    `uid` VARCHAR(36),
    `AccName` VARCHAR(100) NOT NULL,
    `AccType` VARCHAR(50) NOT NULL,
    `address1` VARCHAR(100),
    `address2` VARCHAR(100),
    `address3` VARCHAR(100),
    `city` VARCHAR(50),
    `pincode` INT(6),
    `phoneNo` INT(10),
    `email` VARCHAR(100),
    `GSTIN` VARCHAR(15),
    `RegDate` DATE,
    `propName` VARCHAR(100),
    `PAN` VARCHAR(10),
    `dist` INT(10),
    `transport` VARCHAR(100),
    `openingBal` INT(20),
    `Cr/Dr` VARCHAR(2),
    `beneName` VARCHAR(100),
    `AccountNum` INT(50),
    `IFSC` VARCHAR(11),
    `shares` INT(3),
    PRIMARY KEY (`uid`)
);