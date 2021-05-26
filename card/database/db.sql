-- creating a new table
CREATE TABLE credit_card (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  type VARCHAR(20) NOT NULL,
  balance INT(25),
  owner INT(50),
  active INT(2),
  img VARCHAR(50)
);

-- to show all tables
show tables;

-- to describe table
describe credit_card;