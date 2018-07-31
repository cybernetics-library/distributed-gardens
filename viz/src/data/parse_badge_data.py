import csv, json

obj = {}

with open("badge_data.csv", "r") as csvfile, open("badge_data.json", "w") as jsonfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for i, row in enumerate(spamreader):
        obj[row[0]] = { "word1": row[1], "word2": row[2], "title": row[4] }
    jsonfile.write(json.dumps(obj))

