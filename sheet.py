import pandas as pd
import json

sheet_url = "https://docs.google.com/spreadsheets/d/1IpreXQt8gMkvbMWSK2IdzopMWqfGQDwEtRr4EY5Qoi8/export?format=csv"

df = pd.read_csv(sheet_url)
df = df.fillna("")  # Replace NaN with 0

json_data = df.to_dict(orient="records")

# Print the JSON data
# print(json.dumps(json_data, indent=4, ensure_ascii=False))

# Save to a JSON file
with open('sheet_data.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)
