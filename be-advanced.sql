create database trello;
use trello;
create table roles(
	id INT AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(50) NOT NULL UNIQUE
);
create table users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    roleId int,
    FOREIGN KEY (roleId) REFERENCES roles(id) 
);
insert into roles(roleName) values("admin");