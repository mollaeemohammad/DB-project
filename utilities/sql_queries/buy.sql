# choose the product

INSERT INTO customer (last_name, first_name, password, username)
VALUES ('MOLLAEE', 'MOHAMMAD', 123, 'ASD');

# insert new order
INSERT INTO `order` (status, customer_id, estimate_date, total_cost, discount_percent)
VALUES ('PREPARING', 1, '9999-01-01', 0, 0);

# INSERT INTO ordered_products (order_id, product_id)
# VALUES (the above order_id, product_id 1),
#        (the above order_id, product_id 2),
#        (the above order_id, product_id 3),
#        (the above order_id, product_id 4);
INSERT INTO ordered_products (order_id, product_id)
VALUES (1, 1);



-- calculate sum of prices


# SELECT *
# FROM discount
# WHERE code = `CODE`;


# UPDATE `order`
# SET discount_percent = discount.percentage
# WHERE `order`.id = the above order_id;


-- when its done
# UPDATE `order`
# SET order_date = (CURRENT_DATE)
# WHERE `order`.id = the above order_id;
UPDATE `order`
SET order_date = (CURRENT_DATE)
WHERE `order`.id = 1;



