-- in screen when we choose a product, it must show all info and the stores
-- that provide this  product and their discounts
# SELECT *
# FROM Product AS p
# INNER JOIN SUPPLIES AS s ON p.id = s.product_id
# INNER JOIN Store AS st ON s.store_id = st.id
# LEFT JOIN Reviews AS r on p.id = r.product_id
# WHERE p.id = {id}; -- also name is ok

INSERT INTO store (name, password, location)
VALUES ('abadis', '123', 'darab');

INSERT INTO supplies (store_id, product_id, added_date, discount_percentage)
VALUES (2, 1, '9999-12-31', 0);

INSERT INTO reviews (product_id, discussion, rate)
VALUES (1, 'It is good for me', 5),
       (1, 'hey, nice', 4.9);



SELECT *
FROM Product AS p
INNER JOIN SUPPLIES AS s ON p.id = s.product_id
INNER JOIN Store AS st ON s.store_id = st.id
LEFT JOIN Reviews AS r on p.id = r.product_id
WHERE p.name = 'l340'
ORDER BY r.up_votes DESC ;