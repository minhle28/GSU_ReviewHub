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

CREATE TABLE `review`
(
  `reviewID` INT AUTO_INCREMENT,
  `coursesID` INT,
  `userID` INT,
  `comment` TEXT,
  `reviewDate` DATETIME,
  PRIMARY KEY (`reviewID`),
  FOREIGN KEY (`coursesID`) REFERENCES `courses`(`coursesID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);


INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) VALUES ('1', '0', '0', '0', '1');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) VALUES
('Admin','admin@gmail.com', '$2a$10$7lE8gY1uytxXtbUXFkX30unjimP7JCBIKPBdRushWEzyF4Qb6bZbq', '1'),
('Minh Le','leminh5836@gmail.com', '$2a$10$HRHxnmZhju3xGww4xzK0Iua5bL4iYFOMgPTgwdX2WUDmEizGeUh9a', '0');

INSERT INTO `terms` (type) VALUES
('FA 2022'),
('SP 2023'),
('SU 2023'),
('FA 2023'),
('FA 2005');

INSERT INTO `department` (type) VALUES
('Computer Science'),
('Economics');

INSERT INTO `courses` (`CRN`, `coursePrefix`, `courseNumber`, `professor`, `termsID`, `departmentID`) VALUES 
(102982, 'CSC', 4350, 'Tanvir, Farhan', 2, 1),
(80578, 'CSC', 1010, 'Altun, Gulsah', 5, 1),
(80579, 'CSC', 1010, 'Henry, Louis', 5, 1),
(80580, 'CSC', 2010, 'Bhola, Jaman', 5, 1),
(80584, 'CSC', 2310, 'Chen, Xiujuan', 5, 1),
(80001, 'ECON', 2100, 'Campbell, Douglas', 5, 2),
(80002, 'ECON', 2100, 'Campbell, Douglas', 5, 2),
(80004, 'ECON', 2100, 'Melnik, Mikhail', 5, 2),
(82109, 'ECON', 2105, 'Laury, Susan', 5, 2),
(82120, 'ECON', 3050, 'Rushton, Michael', 5, 2);

INSERT INTO `review` (`coursesID`, `userID`, `comment`, `reviewDate`) VALUES
(1, 2, 'Great course, learned a lot!', '2024-03-24 08:30:00'),
(2, 3, 'Interesting content but could be better organized.', '2024-03-23 12:45:00'),
(3, 2, 'Excellent professor, very engaging lectures.', '2024-03-22 15:20:00'),
(4, 3, 'Challenging but rewarding.', '2024-03-21 10:10:00'),
(5, 2, 'The material was well-presented and easy to understand.', '2024-03-20 14:00:00'),
(6, 3, 'Enjoyed the course overall, but some topics were confusing.', '2024-03-19 09:30:00'),
(7, 2, 'Great introduction to economics.', '2024-03-18 11:20:00'),
(8, 3, 'Insightful discussions in class.', '2024-03-17 13:40:00'),
(9, 2, 'The professor was knowledgeable, but the workload was heavy.', '2024-03-16 10:00:00'),
(9, 3, 'Interesting perspectives on economic theories.', '2024-03-15 09:15:00');
