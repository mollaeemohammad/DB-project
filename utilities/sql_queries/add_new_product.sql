--

# check the product is provided before or not

# INSERT INTO product (rating, price, name, picture, weight, color, dimensions, description)
# VALUES (0, price, name, picture, weight, color, dimensions, description)

# INSERT INTO supplies (store_id, product_id, `count`, added_date, discount_percentage)
# VALUES (store_id, product_id, `count`, added_date, discount_percentage)


INSERT INTO product (rating, price, name,  weight, color, dimensions, description)
VALUES (0, 0, 'ASDFADSF', 2, 'color', 'dimensions', 'description');

INSERT INTO supplies (store_id, product_id, `count`, discount_percentage)
VALUES (2, 2, 10, 0)