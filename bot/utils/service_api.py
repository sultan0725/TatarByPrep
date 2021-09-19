import requests
import config
import json


def get_all_categories():
    request_url = config.url + "/api/dictionary/groups/all"
    response = requests.get(request_url).json()
    return response[:5]


def get_all_words_in_category(category_id):
    request_url = config.url + f"/api/dictionary/group/word/{category_id}"
    response = requests.get(request_url).json()
    return response[:10]


def get_n_random_words(count):
    request_url = config.url + f"/api/dictionary/words/random/{count}"
    response = requests.get(request_url).json()
    return response


def get_word(word_id):
    request_url = config.url + f"/api/dictionary/group/word/{word_id}"
    response = requests.get(request_url).json()
    return response


def get_category(category_id):
    # request_url = config.url + "/api/dictionary/groups/all"
    # response = json.loads(requests.get(request_url).json())
    response = [{'id': 1, "name_origin": 'что то на татарском', "name_rus": "груша"},
                {'id': 2, "name_origin": 'что то на татарском', "name_rus": "яблоко"},
                {'id': 3, "name_origin": 'что то на татарском', "name_rus": "повидло"}]
    for category in response:
        if category_id == category["id"]:
            return category
