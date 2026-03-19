CREATE DATABASE IF NOT EXISTS mechanic_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS spare_parts;
DROP TABLE IF EXISTS spare_parts_types;

CREATE TABLE users(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(45) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	is_admin TINYINT(1) DEFAULT 0,

	status CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE services (
    id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45)  NOT NULL UNIQUE,
    image VARCHAR(255) NOT NULL,
    
    status CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE spare_parts_types (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL UNIQUE,
    
    status CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);

-- 3. Repuestos
CREATE TABLE spare_parts (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type_id INTEGER NOT NULL,
    name VARCHAR(45) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    brand_name VARCHAR(25) NOT NULL,

    status CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
	
	FOREIGN KEY (type_id) REFERENCES spare_parts_types(id)
);

-- 4. Citas (Con Brand y Model como texto directo)
CREATE TABLE appointments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(45) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    
    -- Vehículo como texto simple
    brand VARCHAR(25) NOT NULL,
    model VARCHAR(45) NOT NULL,
    year INT(4) NOT NULL,
    license_plate VARCHAR(15) NOT NULL UNIQUE,
    mileage INTEGER NOT NULL,
    
    service_id INT NOT NULL,
    comment TEXT NULL,
	token VARCHAR(64) NOT NULL,
	token_used TINYINT(1) DEFAULT 0,
    
    status CHAR(1) NOT NULL DEFAULT 'P', 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
	
	FOREIGN KEY (service_id) REFERENCES services(id)
);

