import requests
import csv
import json
from io import StringIO

output_format = "csv"

sheet_url = "https://docs.google.com/spreadsheets/d/1IpreXQt8gMkvbMWSK2IdzopMWqfGQDwEtRr4EY5Qoi8/gviz/tq?tqx=out:csv"
response = requests.get(sheet_url)
assert response.status_code == 200, 'Wrong status code'

csv_data = StringIO(response.text)
csv_reader = csv.DictReader(csv_data)

data = [{k: v for k, v in row.items() if not (k == "" and v == "")} for row in csv_reader]
csv_row_count = len(data)

json_data = json.dumps(data, indent=4)
json_item_count = len(data)

assert csv_row_count == json_item_count, f"Row count mismatch: CSV has {csv_row_count} rows, JSON has {json_item_count} items"
# Print or save JSON data
print(json_data)
# You can save to a file if desired
with open('sheet_data.json', 'w') as json_file:
    json_file.write(json_data)