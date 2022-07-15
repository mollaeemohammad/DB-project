import csv
import random
import requests
from utilities.add_new_product import add_new_product

categories = [1, 2, 3, 6, 7]
stores = [1, 2, 4]
args = []
with open('random-data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            args.append({"price":float(row[1]), "name":row[2], "weight":float(row[4]), "color":row[5], "dimensions":row[6], "count":int(row[7]), "discount_percentage":(int(row[8])/100), "description":row[9], "category_id":categories[random.randrange(0, len(categories))], "store_id":stores[random.randrange(0, len(stores))] })
            line_count += 1
    print(f'Processed {line_count} lines.')

fromItem=999
to = 0
i=0;
# until 30
for i in range(len(args)):
  arg = args[i]
  print(arg)
  if(i>fromItem):
    i
    response = requests.get("https://picsum.photos/200/300?random=1")
    print(response.url)
    add_new_product(name=arg['name'],
                  count=arg['count'],
                  store_id=arg['store_id'],
                  price=arg['price'],
                  category_id=arg['category_id'],
                  picture=response.url,
                  weight=arg['weight'],
                  color=arg['color'],
                  dimensions=arg['dimensions'],
                  description=arg['description'],
                  discount_percentage=arg['discount_percentage'])
  if(i>to):
    break

  i+=1