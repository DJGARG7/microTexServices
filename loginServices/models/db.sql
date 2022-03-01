CREATE DATABASE `microtex`;

CREATE TABLE `microtex`.`Firm` ( `corporate_id` VARCHAR(255) NOT NULL , `user_id` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `admin` BOOLEAN NOT NULL , PRIMARY KEY (`corporate_id`)) ENGINE = InnoDB;

CREATE TABLE `microtex`.`Proprietor` ( `user_id` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`user_id`)) ENGINE = InnoDB;