USE `reviewhub`;

CREATE TABLE `user`
(
  `userID` INT AUTO_INCREMENT,
  `fullName` VARCHAR(100),
  `email` VARCHAR(100),
  `password` VARCHAR(255),
  `isAdmin` INT,
  PRIMARY KEY (`userID`)
);

CREATE TABLE `userToken`
(
  `tokenKey` VARCHAR(255),
  `createdDate` VARCHAR(100),
  `userID` INT,
  PRIMARY KEY (`tokenKey`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

CREATE TABLE `terms`
(
  `termsID` INT AUTO_INCREMENT,
  type VARCHAR(100),
  PRIMARY KEY (`termsID`)
);

CREATE TABLE `department`
(
  `departmentID` INT AUTO_INCREMENT,
  type VARCHAR(100),
  PRIMARY KEY (`departmentID`)
);

CREATE TABLE `courses`
(
  `coursesID` INT AUTO_INCREMENT,
  `CRN` INT,
  `coursePrefix` VARCHAR(255),
  `courseNumber` INT,
  `professor` VARCHAR(255),
  `termsID` INT,
  `departmentID` INT,
  PRIMARY KEY (`coursesID`),
  FOREIGN KEY (`termsID`) REFERENCES `terms`(`termsID`),
  FOREIGN KEY (`departmentID`) REFERENCES `department`(`departmentID`)
);

INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) VALUES ('1', '0', '0', '0', '1');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) VALUES('admin','admin@gmail.com', '$2a$10$7lE8gY1uytxXtbUXFkX30unjimP7JCBIKPBdRushWEzyF4Qb6bZbq', '1');

INSERT INTO `terms` (type) VALUES
('FA 2022'),
('SP 2023'),
('SU 2023'),
('FA 2023');

INSERT INTO `department` (type) VALUES
('Computer Science');

INSERT INTO `courses` (`CRN`, `coursePrefix`, `courseNumber`, `professor`, `termsID`, `departmentID`)
VALUES (102982, 'CSC', 4350, 'Tanvir, Farhan', 2, 1);