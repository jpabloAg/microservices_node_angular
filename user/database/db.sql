-- to create a new database
CREATE DATABASE crud;

-- to use database
use crud;

-- creating a new table
CREATE TABLE customer (
  id INT(50) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15),
  credit VARCHAR(50),
  debito VARCHAR(50)
);

-- to show all tables
show tables;

-- to describe table
describe customer;