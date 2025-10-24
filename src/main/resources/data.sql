INSERT INTO CLIENTES (nombre, correo) VALUES ('Valery Chumpitaz', 'valery@correo.com');
INSERT INTO CLIENTES (nombre, correo) VALUES ('Piero Torres', 'piero@correo.com');
INSERT INTO CLIENTES (nombre, correo) VALUES ('María López', 'maria@correo.com');

INSERT INTO productos (nombre, precio, categoria, descripcion, imagen_url, stock)
VALUES
    ('Shampoo Capilar', 15.00, 'Belleza', 'Para todo tipo de cabello', 'https://example.com/shampoo.jpg', 50),
    ('Tijeras Profesionales', 25.00, 'Accesorios', 'Tijeras de acero inoxidable', 'https://example.com/tijeras.jpg', 30),
    ('Tinte Natural', 20.00, 'Belleza', 'Coloración sin amoníaco', 'https://example.com/tinte.jpg', 40);

INSERT INTO clientes (nombre, correo) VALUES
                                          ('Valery Chumpitaz', 'valery@example.com'),
                                          ('Carlos Ruiz', 'carlos@example.com');

INSERT INTO productos (nombre, precio, categoria, descripcion, imagen_url, stock) VALUES
                                                                                      ('Shampoo Profesional', 25.50, 'Belleza', 'Shampoo hidratante', 'assets/img/shampoo.jpg', 50),
                                                                                      ('Tijeras de Corte', 40.00, 'Peluquería', 'Tijeras de acero inoxidable', 'assets/img/tijeras.jpg', 30);
