import requests
import alice_skill.config as config
import json


def get_all_categories():
    request_url = config.url + "/api/dictionary/groups/all"
    response = requests.get(request_url).json()
    return json.loads(response)

def get_all_words_in_category(category_id):
    request_url = config.url + "/api/dictionary/groups/all"
    response = requests.get(request_url).json()
    return json.loads(response)

