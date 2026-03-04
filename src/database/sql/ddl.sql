DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Vehicule;

CREATE TABLE Customer(
	idCustomer		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	firstName		VARCHAR(50) NOT NULL,
	lastName		VARCHAR(50) NOT NULL,
	phone			VARCHAR(15) NOT NULL UNIQUE,
	email			VARCHAR(100) NOT NULL UNIQUE,
	address			TEXT NOT NULL,
    Estado          VARCHAR(1) NOT NULL DEFAULT('A'),
    FechaCreacion	DATETIME DEFAULT(datetime('now', 'localtime')),
    FechaModificaon DATETIME
);

CREATE TABLE Vehicule(
	idVehicule			INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	idCustomer			INTEGER NOT NULL REFERENCES Customer(idCustomer),
	plateNumber			VARCHAR(15) NOT NULL UNIQUE,
	brand				VARCHAR(50) NOT NULL,
	model				VARCHAR(50) NOT NULL,
	color				VARCHAR(10) NOT NULL,
    Estado				VARCHAR(1) NOT NULL DEFAULT('A'),
    FechaCreacion		DATETIME DEFAULT(datetime('now', 'localtime')),
    FechaModificaon		DATETIME
);
