-- just by the store
# UPDATE supplies
# SET discount_percentage = discount_percentage
# WHERE store_id = store_id AND product_id =  product_id;



UPDATE supplies
SET discount_percentage = 0.50
WHERE store_id = 2 AND product_id =  1;