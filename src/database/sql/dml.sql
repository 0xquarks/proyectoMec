INSERT INTO Customer (firstName, lastName, phone, email, address) VALUES 
('John', 'Doe', '555-0101', 'john.doe@email.com', '123 Maple St, Springfield'),
('Jane', 'Smith', '555-0202', 'jane.smith@email.com', '456 Oak Ave, Metropolis'),
('Carlos', 'Ferreira', '555-0303', 'c.ferreira@email.com', '789 Pine Rd, Gotham'),
('Alice', 'Johnson', '555-0404', 'alice.j@email.com', '321 Elm St, Star City');

INSERT INTO Vehicule (idCustomer, plateNumber, brand, model, color) VALUES 
(1, 'ABC-1234', 'Toyota', 'Corolla', 'Silver'),
(1, 'XYZ-9876', 'Honda', 'CR-V', 'Black'),
(2, 'GHT-4567', 'Ford', 'F-150', 'Blue'),
(3, 'LMN-1122', 'Tesla', 'Model 3', 'White'),
(4, 'BJK-3344', 'Chevrolet', 'Tahoe', 'Red');
