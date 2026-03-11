DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS spare_parts;
DROP TABLE IF EXISTS spare_parts_types;

-- 1. Catálogo de Servicios
CREATE TABLE services (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
    
    status VARCHAR(1) NOT NULL DEFAULT('A'),
    created_at DATETIME DEFAULT(datetime('now', 'localtime')),
    updated_at DATETIME
);

-- 2. Tipos de Repuestos
CREATE TABLE spare_parts_types (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    
    status VARCHAR(1) NOT NULL DEFAULT('A'),
    created_at DATETIME DEFAULT(datetime('now', 'localtime')),
    updated_at DATETIME
);

-- 3. Repuestos
CREATE TABLE spare_parts (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    brand_name VARCHAR(25) NOT NULL,

    status VARCHAR(1) NOT NULL DEFAULT('A'),
    created_at DATETIME DEFAULT(datetime('now', 'localtime')),
    updated_at DATETIME,
	
	FOREIGN KEY (type_id) REFERENCES spare_parts_types(id)
);

-- 4. Citas (Con Brand y Model como texto directo)
CREATE TABLE appointments (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    
    -- Vehículo como texto simple
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    license_plate TEXT NOT NULL UNIQUE,
    mileage INTEGER NOT NULL,
    
    service_id INTEGER NOT NULL,
    comment TEXT NULL,
    
    status VARCHAR(1) NOT NULL DEFAULT('P'), 
    created_at DATETIME DEFAULT(datetime('now', 'localtime')),
    updated_at DATETIME,
	
	FOREIGN KEY (service_id) REFERENCES services(id)
);

