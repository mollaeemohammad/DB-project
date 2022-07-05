from mysql.connector import MySQLConnection
from python_mysql_dbconfig import read_db_config

dbconfig = read_db_config()
conn = MySQLConnection(**dbconfig)
