CREATE TABLE `master_design` (
  `Dno` int(11) NOT NULL,
  `NAME` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `CLOTH_TYPE` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `BASIC_COST` int(11) DEFAULT NULL,
  `WORK_COST` int(11) DEFAULT NULL,
  `LACE_COST` int(11) DEFAULT NULL,
  `DIAMOND_COST` int(11) DEFAULT NULL,
  `PACKING_COST` int(11) DEFAULT NULL,
  `MU` int(11) DEFAULT NULL,
  `CALC_PRICE` int(11) DEFAULT NULL,
  `WORK_JOB` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LACE_JOB` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DIAM_JOB` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `master_design`
  ADD PRIMARY KEY (`Dno`);