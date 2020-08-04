create database if not exists user_login;

use user_login;

create table if not exists user (
    id int(5) not null auto_increment primary key,
    name varchar(50) not null,
    lastname varchar(50) not null,
    username varchar(50) not null,
    password varchar(100) not null,
    email varchar(50) not null,
    nationality varchar(50) not null,
    tel varchar(10) not null,
    gender varchar(6) not null
);

describe user;

select * from user;