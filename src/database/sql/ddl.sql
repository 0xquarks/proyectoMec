DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS sparePartsType;
DROP TABLE IF EXISTS spareParts;

CREATE TABLE service(
	idService		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name			TEXT	NOT NULL UNIQUE,
	image			TEXT	NOT NULL UNIQUE,

    estado          VARCHAR(1) NOT NULL DEFAULT('A'),
    fechaCreacion	DATETIME DEFAULT(datetime('now', 'localtime')),
    fechaModificaon DATETIME
);

CREATE TABLE sparePartsType(
	idSparePartsType	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name				TEXT NOT NULL UNIQUE,
	
    estado				VARCHAR(1) NOT NULL DEFAULT('A'),
    fechaCreacion		DATETIME DEFAULT(datetime('now', 'localtime')),
    fechaModificaon		DATETIME
);

CREATE TABLE spareParts()
	idSpareParts	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	idType			INTEGER NOT NULL REFERENCES sparePartsType(idSparePartsType),
	name			TEXT NOT NULL,
	image			TEXT NOT NULL,
	description		TEXT NOT NULL,
	brand			VARCHAR(25) NOT NULL,

    estado          VARCHAR(1) NOT NULL DEFAULT('A'),
    fechaCreacion	DATETIME DEFAULT(datetime('now', 'localtime')),
    fechaModificaon DATETIME
;
