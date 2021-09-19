import json

template = "INSERT INTO word_list(word_original, word_rus,group_id) VALUES {values}"

with open("words_from_text.json") as file:
    data = json.load(file)

for word_original, word_rus in data.items():
    print(template.format(values=(word_original, word_rus, 5)) + ";")