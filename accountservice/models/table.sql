CREATE DATABASE ADMINDASHBOARD;

CREATE TABLE account_master (account_id int(10) PRIMARY KEY AUTO_INCREMENT,address_name varchar(100) NOT NULL,account_type varchar(100) NOT NULL,address_line_1 varchar(100), address_line_2 varchar(100),address_line_3 varchar(100),city VARCHAR(20),pincode int(10));
