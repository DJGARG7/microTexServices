/*
Table for creating type of jobs available in the industry PRI KEY = jobID (autoincrment)
*/
CREATE TABLE `job_types` (
 `jobId` int(16) NOT NULL AUTO_INCREMENT,
 `jobType` varchar(40) DEFAULT NULL,
 PRIMARY KEY (`jobId`),
 UNIQUE KEY `jobType` (`jobType`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4
/*
Table for creating type of jobs available in the industry PRI KEY = jobID (autoincrment)
*/




CREATE TABLE `job_challans` (
 `challanNo` int(10) NOT NULL,
 `accountID` varchar(36) NOT NULL,
 `jobTypeID` int(10) NOT NULL,
 `challanDate` date NOT NULL,
 PRIMARY KEY (`challanNo`),
 KEY `job_accountID` (`accountID`),
 KEY `jobTypeID` (`jobTypeID`),
 CONSTRAINT `jobTypeID` FOREIGN KEY (`jobTypeID`) REFERENCES `job_types` (`jobId`),
 CONSTRAINT `job_accountID` FOREIGN KEY (`accountID`) REFERENCES `master_account` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4



/*
Table for holding all the item related information 
PRI KEY = jobitemid (autoINCRment)
FOREGIN KEY 
1. challan NO -> From job_challans
2. greyitemID -> Prikey of items bought in greypurchase
*/

CREATE TABLE `job_item_details` (
 `jobItemID` int(10) NOT NULL AUTO_INCREMENT,
 `challanNo` int(10) NOT NULL,
 `greyItemID` int(10) NOT NULL,
 `jobQuality` varchar(20) NOT NULL,
 `pieces` int(10) NOT NULL,
 `meters` int(10) NOT NULL,
 `jobRate` int(10) NOT NULL,
 PRIMARY KEY (`jobItemID`),
 KEY `challanNo` (`challanNo`),
 KEY `grey_job_itemFK` (`greyItemID`),
 CONSTRAINT `challanNo` FOREIGN KEY (`challanNo`) REFERENCES `job_challans` (`challanNo`) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT `grey_job_itemFK` FOREIGN KEY (`greyItemID`) REFERENCES `GREY_ITEMS` (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4





/*
View for viewing all the items and related bill information
*/
CREATE VIEW job_send_items AS SELECT challanNo, challanDate, AccName,jobType, itemName, jobQuality,pieces, meters, jobRate 
FROM job_challans NATURAL JOIN job_item_details INNER JOIN master_account INNER JOIN GREY_ITEMS INNER JOIN job_types WHERE 
job_challans.accountID = master_account.uid AND job_item_details.greyItemID = GREY_ITEMS.itemID 
AND job_challans.jobTypeID = job_types.jobId;



/*
Transaction table where foregin keys are 
1. itemID
2. itemname
*/
CREATE TABLE `inventory` (
 `itemID` int(11) NOT NULL,
 `itemname` varchar(10) NOT NULL,
 `meters` int(11) NOT NULL,
 `status` varchar(11) NOT NULL,
 `remark` varchar(11) NOT NULL,
 KEY `itemID` (`itemID`),
 KEY `itemName` (`itemname`),
 CONSTRAINT `itemID` FOREIGN KEY (`itemID`) REFERENCES `GREY_ITEMS` (`itemID`),
 CONSTRAINT `itemName` FOREIGN KEY (`itemname`) REFERENCES `GREY_ITEMS` (`itemName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
