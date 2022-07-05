


-- `canceled` & `received` status if for customer
# show all orders of a customer

# UPDATE `order`
# SET status = `canceled` & `received`
# WHERE id = order_id;


UPDATE `order`
SET status = 'received'
WHERE id = 1;



-- `preparing` & `delivered` status is for admin
# show all orders of a customer

# UPDATE `order`
# SET status = `preparing` & `delivered`
# WHERE id = order_id;