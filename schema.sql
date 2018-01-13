DROP DATABASE IF EXISTS CalCount;

CREATE DATABASE CalCount;

USE CalCount;

CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,  
  PRIMARY KEY (ID)
);

CREATE TABLE food (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  calories integer NOT NULL,
  date integer NOT NULL,
  user integer NOT NULL,
  FOREIGN KEY (user) REFERENCES user(id),
  PRIMARY KEY (ID)
);

CREATE TABLE exercise (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  calories integer NOT NULL,
  user integer NOT NULL, 
  date integer NOT NULL,
  FOREIGN KEY (user) REFERENCES user(id),  
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
