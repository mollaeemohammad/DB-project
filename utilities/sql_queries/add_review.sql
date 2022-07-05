-- first check the user has bought before or not
# SELECT *
# FROM customer AS c
# INNER JOIN `order` AS o ON c.id = o.customer_id
# INNER JOIN ordered_products op on o.id = op.order_id
# WHERE customer_id = customer_id AND product_id = product_id;


SELECT *
FROM customer AS c
INNER JOIN `order` AS o ON c.id = o.customer_id
INNER JOIN ordered_products op on o.id = op.order_id
WHERE customer_id = 1 AND product_id = 1;


# INSERT INTO reviews (product_id, discussion, rate)
# VALUES (product_id, discussion, rate);



INSERT INTO reviews (product_id, discussion, rate)
VALUES (1, 'discussion', 5);