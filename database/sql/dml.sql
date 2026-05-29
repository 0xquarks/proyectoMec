INSERT INTO spare_parts_types(name) VALUES ('Aceites');
INSERT INTO spare_parts_types(name) VALUES ('Filtros');
INSERT INTO spare_parts_types(name) VALUES ('Repuestos Electrónicos');
INSERT INTO spare_parts_types(name) VALUES ('Frenos');

INSERT INTO users (username, password, is_admin) VALUES ('admin', '0192023a7bbd73250516f069df18b500', 1);

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(1,'Castrol EDGE 5W-30','images/repuestos/aceite-Castrol.png',
'Aceite sintético avanzado que reduce la fricción del motor y mejora el rendimiento en altas temperaturas.',
'Castrol');

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(1,'Mobil 1 5W-30','images/repuestos/aceite-mobil.webp',
'Aceite totalmente sintético que mantiene limpio el motor y mejora el consumo de combustible.',
'Mobil');


INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(2,'Filtro de Aceite ACDelco','images/repuestos/Filtro-ACDelco.webp',
'Filtro diseñado para retener impurezas y proteger el sistema de lubricación del motor.',
'ACDelco');

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(2,'Filtro de Aire Mann','images/repuestos/Filtro-Mann.jpg',
'Filtro de alta calidad con excelente capacidad de retención de suciedad.',
'Mann Filter');

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(3,'Sensor de Oxígeno Bosch','images/repuestos/Repuesto-Electronico-Bosch.png',
'Sensor que regula la mezcla aire-combustible para mejorar el consumo y reducir emisiones.',
'Bosch');

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(3,'Bobina de Encendido Denso','images/repuestos/Repuesto-Electronico-Denso.png',
'Genera la chispa necesaria para el funcionamiento eficiente del motor.',
'Denso');

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(4,'Pastillas de Freno IncolBest','images/repuestos/Freno-IncolBest.webp',
'Pastillas resistentes al desgaste con buen rendimiento en frenado urbano.',
'IncolBest');

INSERT INTO spare_parts
(type_id,name,image,description,brand_name)
VALUES
(4,'Kit de Frenos Bosch','images/repuestos/Frenos-Bosch.webp',
'Sistema de frenado confiable con excelente respuesta y seguridad.',
'Bosch');

INSERT INTO services (name, image) VALUES
('Cambio de Aceite de Motor', 'images/servicios/aceite-motor-01-485x250.jpg'),
('Cambio de Aceite de Transmisión', 'images/servicios/aceite-transmision-01-485x250.jpg'),
('Afinamiento de Motor', 'images/servicios/motor-01-485x250.jpg'),
('Limpieza Inyectores', 'images/servicios/limpieza-inyectores-01-485x250.jpg'),
('Cambio de Kit de Distribución', 'images/servicios/distribucion-01-485x250.jpg'),
('Sistema de Frenos', 'images/servicios/frenos-01-485x250.jpg'),
('Sistema de Embrague', 'images/servicios/embrague-01-485x250.jpg'),
('Suspensión y Carrocería', 'images/servicios/suspension-01-485x250.jpg');

