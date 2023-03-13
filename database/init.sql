CREATE DATABASE IF NOT EXISTS synapse_app;

USE synapse_app;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Admins;
DROP TABLE IF EXISTS Connections;
DROP TABLE IF EXISTS `Groups`;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Communities;
DROP TABLE IF EXISTS DirectMessages;
DROP TABLE IF EXISTS GroupMessages;


CREATE TABLE Users (
	user_id VARCHAR(64),
	username VARCHAR(50) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(64) UNIQUE NOT NULL,
    userpass VARCHAR(128) NOT NULL,
	intro TINYTEXT,
	PRIMARY KEY (user_id)
);

CREATE TABLE Admins (
	admin_id VARCHAR(64),
	adminname VARCHAR(50) NOT NULL,
	adminpass VARCHAR(128) NOT NULL,
	PRIMARY KEY (admin_id)
);

CREATE TABLE Connections (
	connection_id VARCHAR(64),
	userA_id VARCHAR(64) NOT NULL,
	userB_id VARCHAR(64) NOT NULL,
	Status CHAR(10) NOT NULL  DEFAULT 'pending',
	PRIMARY KEY (connection_id),
	FOREIGN KEY (userA_id) REFERENCES Users (user_id),
	FOREIGN KEY (userB_id) REFERENCES Users (user_id)
);

CREATE TABLE `Groups` (
	group_id VARCHAR(64),
	group_name VARCHAR(50) NOT NULL,
	group_description TINYTEXT,
	PRIMARY KEY (group_id)
);
-- using “Groups” as the table name gives an error. Apparently because groups is a reserved keyword in mysql. Use backticks (`) to refer to this table

CREATE TABLE Courses (
	course_id VARCHAR(64),
	duration CHAR(16) NOT NULL DEFAULT 'uncategorized',
	PRIMARY KEY (course_id),
	FOREIGN KEY (course_id) REFERENCES `Groups` (group_id)
);

CREATE TABLE Communities (
	community_id VARCHAR(64),
	created_by VARCHAR(64) NOT NULL,
	visibility CHAR(10) NOT NULL DEFAULT 'public',
	PRIMARY KEY (community_id),
	FOREIGN KEY (community_id) REFERENCES `Groups` (group_id),
	FOREIGN KEY (created_by) REFERENCES Users (user_id)
);

CREATE TABLE DirectMessages (
	id BIGINT(20) AUTO_INCREMENT,
	sender_id VARCHAR(64) NOT NULL,
    receiver_id VARCHAR(64) NOT NULL,
	message TEXT NOT NULL,
    timestamp CHAR(20) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (sender_id) REFERENCES Users (user_id),
	FOREIGN KEY(receiver_id) REFERENCES Users (user_id)
);

CREATE TABLE GroupMessages (
	id BIGINT(20) AUTO_INCREMENT,
	group_id VARCHAR(64) NOT NULL,
	user_id VARCHAR(64) NOT NULL,
	message TEXT NOT NULL,
	timestamp CHAR(20) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (group_id) REFERENCES `Groups` (group_id),
	FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

CREATE TABLE MemberOf (
	group_id VARCHAR(64),
	user_id VARCHAR(64),
	PRIMARY KEY (group_id, user_id),
	FOREIGN KEY (group_id) REFERENCES `Groups` (group_id),
	FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- 1 test entries
-- INSERT INTO Users (user_id, username, first_name, last_name, email, userpass, intro) 
--     VALUES ('testuser1', 'bobby', 'Bobby', 'Chan', 'bobbyc@sfu.ca', 'bobbypass', 'I am the instructor for CMPT372!');
-- INSERT INTO `Groups` (group_id, group_name, group_description) 
--     VALUES ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Volleyball Lovers', 'We welcome all lovers of volleyball!');
-- INSERT INTO Communities (community_id, created_by) 
--     VALUES ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'testuser1');

-- 2 test queries
-- select * from Users;
-- select * from `Groups`;
-- select G.group_id, G.group_name, G.group_description, C.created_by, C.visibility from `Groups` G, Communities C WHERE G.group_id=C.community_id;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root@synapse';
flush privileges;