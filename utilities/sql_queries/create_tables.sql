CREATE TABLE IF NOT EXISTS Customer
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    last_name  VARCHAR(300),
    first_name VARCHAR(300),
    password   VARCHAR(300),
    username   VARCHAR(300) UNIQUE
);




# CREATE TABLE Addresses ####################
# (
#     address_id       INT PRIMARY KEY AUTO_INCREMENT,
#     customer_id      INT REFERENCES Customer (id),
#     complete_address VARCHAR(500)
# );

CREATE TABLE IF NOT EXISTS Addresses
(
    address_id       INT PRIMARY KEY AUTO_INCREMENT,
    customer_id      INT NOT NULL,
    complete_address VARCHAR(500),
    FOREIGN KEY (customer_id) REFERENCES Customer (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS Store
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(300) UNIQUE,
    password VARCHAR(300),
    location VARCHAR(200)
);



CREATE TABLE IF NOT EXISTS Delivery
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(300) UNIQUE,
    cost DECIMAL(6, 2) DEFAULT 0.00 NOT NULL
);


# CREATE TABLE DELIVER_BY #########################
# ( -- STORE & DELIVERY
#     delivery_id INT REFERENCES Delivery (id) ON DELETE CASCADE,
#     store_id    INT REFERENCES Store (id) ON DELETE CASCADE,
# );


CREATE TABLE IF NOT EXISTS DELIVER_BY #########################
( -- STORE & DELIVERY
    delivery_id INT NOT NULL,
    store_id    INT NOT NULL,
    FOREIGN KEY (delivery_id) REFERENCES Delivery (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (store_id) REFERENCES Store (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS Product
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    rating      DECIMAL(2, 1) CHECK ( rating >= 0 AND rating <= 5 ),
    price       DECIMAL(9, 2) CHECK ( price >= 0 ),
    name        VARCHAR(300) UNIQUE,
    picture     VARCHAR(500),
    weight      DECIMAL(5, 1),
    color       VARCHAR(100),
    dimensions  VARCHAR(100), # '2*2*3',
    description TEXT
);


# CREATE TABLE Fs ###################
# (
#     customer_id   INT REFERENCES Customer (id) ON DELETE CASCADE,
#     product_id    INT REFERENCES Product (id) ON DELETE CASCADE,
#     notified_date DATE                                           NOT NULL
# );

CREATE TABLE IF NOT EXISTS Notifications
(
    customer_id   INT  NOT NULL,
    product_id    INT  NOT NULL,
    notified_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


# CREATE TABLE SUPPLIES #####################
# (                             -- STORE & PRODUCT
#     store_id            INT REFERENCES Store (id) ON DELETE CASCADE,
#     product_id          INT REFERENCES Product (id) ON DELETE CASCADE,
#     count               INT DEFAULT 0 CHECK ( count >= 0 ),
#     added_date          DATE, -- I had some Err
#     discount_percentage DECIMAL(3, 2) CHECK ( discount_percentage >= 0 AND discount_percentage <= 1 ),
# );


CREATE TABLE IF NOT EXISTS SUPPLIES #####################
(                             -- STORE & PRODUCT
    store_id            INT NOT NULL,
    product_id          INT NOT NULL,
    count               INT DEFAULT 0 CHECK ( count >= 0 ),
    added_date          DATE DEFAULT (CURRENT_DATE),
    discount_percentage DECIMAL(3, 2) CHECK ( discount_percentage >= 0 AND discount_percentage <= 1 ),
    FOREIGN KEY (store_id) REFERENCES Store (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS Category
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(300) NOT NULL UNIQUE
);



# CREATE TABLE CATEGORIZATION ####################
# ( -- STORE & PRODUCT
#     product_id  INT REFERENCES Product (id) ON DELETE CASCADE,
#     category_id INT REFERENCES Category (id) ON DELETE CASCADE
# );

CREATE TABLE IF NOT EXISTS CATEGORIZATION ####################
( -- STORE & PRODUCT
    product_id  INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



# CREATE TABLE `Order` ######################
# (
#     id               INT PRIMARY KEY AUTO_INCREMENT,
#     status           ENUM ('RECEIVED', 'CANCELED', 'DELIVERED', 'PREPARING'),
#     customer_id      INT REFERENCES Customer (id),
#     receipt_date     DATE          DEFAULT NULL,
#     estimate_date    DATE NOT NULL,
#     total_cost       DECIMAL(9, 2) CHECK ( total_cost >= 0.00 AND total_cost <= 10000000.00),
#     order_date       DATE,
#     discount_percent DECIMAL(3, 2) CHECK ( discount_percent >= 0.00 AND discount_percent <= 1.00 ),
#     delivery_cost    DECIMAL(6, 2) DEFAULT 0.00 CHECK ( delivery_cost >= 0 )
# );


CREATE TABLE IF NOT EXISTS `Order` ######################
(
    id               INT PRIMARY KEY AUTO_INCREMENT,
    status           ENUM ('RECEIVED', 'CANCELED', 'DELIVERED', 'PREPARING'),
    customer_id      INT  NOT NULL,
    receipt_date     DATE          DEFAULT NULL,
    estimate_date    DATE NOT NULL,
    total_cost       DECIMAL(9, 2) CHECK ( total_cost >= 0.00 AND total_cost <= 10000000.00),
    order_date       DATE,
    discount_percent DECIMAL(3, 2) CHECK ( discount_percent >= 0.00 AND discount_percent <= 1.00 ),
    delivery_cost    DECIMAL(6, 2) DEFAULT 0.00 CHECK ( delivery_cost >= 0 ),
    FOREIGN KEY (customer_id) REFERENCES Customer (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



# CREATE TABLE PROBLEM #####################
# ( -- ORDER & STORE
#     order_id     INT REFERENCES `Order` (id) ON DELETE CASCADE,
#     store_id     INT REFERENCES Store (id) ON DELETE CASCADE,
#     problem_type ENUM ('DELAY', 'DAMAGE', 'NOTHING') NOT NULL,
#     ticket_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
# );



CREATE TABLE IF NOT EXISTS PROBLEM #####################
( -- ORDER & STORE
    order_id     INT                                 NOT NULL,
    store_id     INT                                 NOT NULL,
    problem_type ENUM ('DELAY', 'DAMAGE', 'NOTHING') NOT NULL,
    ticket_date  DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (order_id) REFERENCES `Order` (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (store_id) REFERENCES Store (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS Discount
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    code       VARCHAR(300) NOT NULL,
    percentage DECIMAL(3, 2) DEFAULT 0.00 CHECK ( percentage >= 0.00 AND percentage < 1.00 ),
    begin_date DATE         NOT NULL,
    end_date   DATE         NOT NULL
);


CREATE TABLE IF NOT EXISTS Admin
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(300) UNIQUE,
    password VARCHAR(300)
);


# CREATE TABLE ORDERED_PRODUCTS ###################
# ( -- ORDER & PRODUCT
#     order_id   INT REFERENCES `Order` (id) ON DELETE CASCADE,
#     product_id INT REFERENCES Product (id) ON DELETE CASCADE
# );

CREATE TABLE IF NOT EXISTS ORDERED_PRODUCTS ###################
( -- ORDER & PRODUCT
    order_id   INT NOT NULL,
    product_id INT NOT NULL,
    store_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `Order` (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (store_id) REFERENCES Store (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE ORDERED_PRODUCTS
ADD COLUMN count_product INT DEFAULT 1 check ( count_product>= 1 );


# CREATE TABLE WANTED ###################
# ( -- CUSTOMER & PRODUCT
#     product_id  INT REFERENCES Product (id) ON DELETE CASCADE,
#     customer_id INT REFERENCES Customer (id) ON DELETE CASCADE
# );


CREATE TABLE IF NOT EXISTS WANTED ###################
( -- CUSTOMER & PRODUCT
    product_id  INT NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customer (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



# CREATE TABLE Reviews ####################
# (
#     id         INT PRIMARY KEY AUTO_INCREMENT,
#     product_id INT REFERENCES Product (id),
#     discussion TEXT NOT NULL,
#     rate       DECIMAL(3, 2) DEFAULT 0.00 CHECK ( rate >= 0.00 AND rate <= 5.00 ),
#     up_votes   INT           DEFAULT 0 CHECK ( up_votes >= 0 ),
#     down_votes INT           DEFAULT 0 CHECK ( down_votes >= 0 )
# );


CREATE TABLE IF NOT EXISTS Reviews ####################
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT  NOT NULL,
    discussion TEXT NOT NULL,
    rate       DECIMAL(3, 2) DEFAULT 0.00 CHECK ( rate >= 0.00 AND rate <= 5.00 ),
    up_votes   INT           DEFAULT 0 CHECK ( up_votes >= 0 ),
    down_votes INT           DEFAULT 0 CHECK ( down_votes >= 0 ),
    FOREIGN KEY (product_id) REFERENCES Product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


# CREATE TABLE PRODUCT_REVIEWS
# ( -- REVIEWS & PRODUCT
#     review_id  INT REFERENCES Reviews (id) NOT NULL,
#     product_id INT REFERENCES Product (id) NOT NULL
# )



