CREATE TABLE customers (
    id SERIAL NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    address TEXT,
    PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT unique_username UNIQUE (username),
    CONSTRAINT unique_phone UNIQUE (phone)
);

CREATE TABLE products (
    id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    
);

SELECT * FROM admin where username = 'admin';

INSERT INTO admin(username, password)
VALUES('admin', 'admin');