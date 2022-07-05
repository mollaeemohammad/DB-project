

-- filter by price
SELECT *
FROM ({THE SUBQUERY})
WHERE product.price BETWEEN NUM1 AND NUM2;


-- filter by name
SELECT *
FROM ({THE SUBQUERY})
WHERE product.name LIKE '%THE THING%';


-- filter by color
SELECT *
FROM ({THE SUBQUERY})
WHERE product.color = {color};



-- filter by weight
SELECT *
FROM ({THE SUBQUERY})
WHERE product.weight BETWEEN NUM1 AND NUM2;


-- order by rate MAX TO MIN
SELECT *
FROM ({THE SUBQUERY})
ORDER BY product.rate DESC;


-- order by rate MIN TO MAX
SELECT *
FROM ({THE SUBQUERY})
ORDER BY product.rate;


-- order by price MAX TO MIN
SELECT *
FROM ({THE SUBQUERY})
ORDER BY product.price DESC;


-- order by price MIN TO MAX
SELECT *
FROM ({THE SUBQUERY})
ORDER BY product.price;



-- order by added date MAX TO MIN
SELECT *
FROM ({THE SUBQUERY})
INNER JOIN Supplies AS s ON product_id = s.store_id
ORDER BY product.date DESC;


-- order by added date MIN TO MAX
SELECT *
FROM ({THE SUBQUERY})
INNER JOIN Supplies AS s ON product_id = s.store_id
ORDER BY product.date;
