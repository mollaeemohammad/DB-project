--
# SELECT *
# FROM store AS s
# INNER JOIN supplies s2 on s.id = s2.store_id
# INNER JOIN product p on s2.product_id = p.id
# WHERE store_id = store_id;


SELECT *
FROM store AS s
INNER JOIN supplies s2 on s.id = s2.store_id
INNER JOIN product p on s2.product_id = p.id
WHERE store_id = 2;