DROP DATABASE IF EXISTS FolderApp;


CREATE DATABASE FolderApp
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE FolderApp;


CREATE TABLE Folders
(
  name VARCHAR(50) UNIQUE PRIMARY KEY,
  title VARCHAR(100),
  date DATETIME,
  description VARCHAR(500),

  -- allow for sorting on date.
  INDEX(date)
)
ENGINE = InnoDB;

CREATE TABLE Files
(
  folder_name VARCHAR(50),
  filename VARCHAR(50),
  description VARCHAR(500),
  date DATETIME,

  FOREIGN KEY (folder_name) REFERENCES Folders (name),
  INDEX (folder_name, date)
)
ENGINE = InnoDB;


CREATE TABLE Users
(
  user_uuid VARCHAR(50) UNIQUE PRIMARY KEY,
  email_address VARCHAR(150) UNIQUE,

  display_name VARCHAR(100) UNIQUE,
  password VARCHAR(100),

  first_seen_date BIGINT,
  last_modified_date BIGINT,
  deleted BOOL DEFAULT false,

  INDEX(email_address, deleted),
  INDEX(user_uuid, deleted)
)
ENGINE = InnoDB;


