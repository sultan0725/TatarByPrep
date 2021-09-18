import xml.etree.ElementTree as et
import requests


def translate_word(word: str, language: int) -> dict:
    params = {
        "lang": language,
        "text": word}

    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"}

    root = et.fromstring(
        text=requests.get(
            url="https://translate.tatar/byhackathon_translate",
            params=params, headers=headers).content)

    return {
        "part_of_speech": root.findall(".//POS")[0].text,
        "translation": [translation.text for translation in root.findall(".//translation")],
        "examples": [example for example in root.findall(".//exmaples")]
    }


def translate_phrase(phrase: str, language: int) -> str:
    params = {
        "lang": language,
        "text": phrase}

    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"}

    return requests.get(
        url="https://translate.tatar/byhackathon_translate",
        headers=headers, params=params).text
