CREATE TABLE `billdetails` (
    `BillNo` INT(10),
    `BillDate` DATE,
    `accntnames` VARCHAR(100) NOT NULL,
    `ChallanNo` INT(10),
    `ChallanDate` DATE,
    `Agent` VARCHAR(10),
    `EntryNo` INT(10),
    PRIMARY KEY (`BillNo`)
);


CREATE TABLE `itemdetails` (
    `BillNo` VARCHAR(10) NOT NULL,
    `ItemName` VARCHAR(100),
    `Marka` DECIMAL(20,2),
    `Taka` INT(10),
    `Mts` DECIMAL(20,2),
    `Fold` INT(20),
    `ActMts` DECIMAL(20,2),
    `Rate` DECIMAL(20,2),
    `Amount` DECIMAL(20,2),
    `Discount` DECIMAL(20,2),
    `IGST` DECIMAL(20,2),
    `CGST` DECIMAL(20,2),
    `SGST` DECIMAL(20,2)
);