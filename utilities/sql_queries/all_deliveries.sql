-- when user wants to order, we show all of its options for delivery
# SELECT *
# FROM store
# INNER JOIN deliver_by AS db ON store.id = db.store_id
# INNER JOIN delivery AS d ON db.delivery_id = d.id
# WHERE store_id = store_id;


INSERT INTO delivery (name, cost)
VALUES ('ALIBABA', 1000);

INSERT INTO deliver_by (delivery_id, store_id)
VALUES (1, 2);


SELECT *
FROM store
INNER JOIN deliver_by AS db ON store.id = db.store_id
INNER JOIN delivery AS d ON db.delivery_id = d.id
WHERE store_id = 2;