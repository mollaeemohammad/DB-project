from connection import conn
from mysql.connector import Error


def up_vote_review(review_id: int) -> None:
    try:
        cursor = conn.cursor()
        cursor.execute(f'UPDATE Reviews \
                        SET up_votes = up_votes + 1 \
                        WHERE id = {review_id}')
        conn.commit()
    except Error as error:
        print(error)


def down_vote_review(review_id: int) -> None:
    try:
        cursor = conn.cursor()
        cursor.execute(f'UPDATE Reviews \
                        SET down_votes = down_votes + 1 \
                        WHERE id = {review_id}')
        conn.commit()
    except Error as error:
        print(error)
