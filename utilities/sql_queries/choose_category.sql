-- click on one category
# SELECT *
# FROM Category AS c
# INNER JOIN CATEGORIZATION AS CA ON c.id = CA.category_id
# INNER JOIN product p on CA.product_id = p.id
# WHERE c.name = {name}

INSERT INTO category (name)
VALUES ('laptop');

INSERT INTO product (rating, price, name, description)
VALUES (4.9, 10000, 'l340', 'Its good');

INSERT INTO categorization (product_id, category_id) VALUES (1, 1);


SELECT *
FROM Category AS c
INNER JOIN CATEGORIZATION AS CA ON c.id = CA.category_id
INNER JOIN product p on CA.product_id = p.id
WHERE c.name = 'laptop';