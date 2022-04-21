CREATE TABLE `sales_order` (
  `BILL_NO` int(11) NOT NULL,
  `CNAME` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ORDER_DATE` date DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `sales_order`
  ADD PRIMARY KEY (`BILL_NO`);
COMMIT;

CREATE TABLE `sales_order_details` (
  `BILL_NO` int(11) DEFAULT NULL,
  `NAME` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `QTY` int(11) DEFAULT NULL,
  `RATE` int(11) DEFAULT NULL,
  `TYPE` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
ALTER TABLE `sales_order_details`
  ADD KEY `BILL_NO` (`BILL_NO`);
ALTER TABLE `sales_order_details`
  ADD CONSTRAINT `sales_order_details_ibfk_1` FOREIGN KEY (`BILL_NO`) REFERENCES `sales_order` (`BILL_NO`) ON DELETE CASCADE;
COMMIT;
