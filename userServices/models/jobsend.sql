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



/*
Table for holding all the bill related information 
PRI KEY = ChallanNO
FOREGIN KEY 
1. ACCOUNT ID -> account id in master_account on delete do nothing
2. jobtypeID -> job type table pri key
*/
CREATE TABLE `job_bills` (
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
Table for holding all the bill related information 
PRI KEY = ChallanNO
FOREGIN KEY 
1. ACCOUNT ID -> account id in master_account on delete do nothing
2. jobtypeID -> job type table pri key
*/




/*
Table for holding all the item related information 
PRI KEY = jobitemid (autoINCRment)
FOREGIN KEY 
1. challan NO -> From job_bills
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
 CONSTRAINT `challanNo` FOREIGN KEY (`challanNo`) REFERENCES `job_bills` (`challanNo`) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT `grey_job_itemFK` FOREIGN KEY (`greyItemID`) REFERENCES `GREY_ITEMS` (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4

/*
Table for holding all the item related information 
PRI KEY = jobitemid (autoINCRment)
FOREGIN KEY 
1. challan NO -> From job_bills
2. greyitemID -> Prikey of items bought in greypurchase
*/
