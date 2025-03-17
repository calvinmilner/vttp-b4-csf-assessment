-- TODO Task 3
CREATE TABLE purchase_orders (
    order_id varchar(64) not null PRIMARY KEY,
    date date,
    name varchar(255) not null,
    address varchar(255) not null,
    priority boolean,
    comments text
);

CREATE TABLE line_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    prod_id VARCHAR(50),
    quantity INT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES purchase_orders(order_id)
);