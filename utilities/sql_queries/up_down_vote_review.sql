-- every one can do this

-- up vote
# UPDATE reviews
# SET up_votes = up_votes+1
# WHERE id = review_id;

-- down vote
# UPDATE reviews
# SET down_votes = down_votes+1
# WHERE id = review_id;


UPDATE reviews
SET up_votes = up_votes+1
WHERE id = 1;


