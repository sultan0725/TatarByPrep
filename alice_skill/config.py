REQUEST_STATE = "session"
RESPONSE_STATE = "session_state"
url = "tatarinteam.ru"


class IntentsNames:
    gallery = "galery"
    items_list = "items_list"
    big_image = "big_image"
    send_fact = "send_fact"
    tatar_rules = "tatar_rules"
    find_excess = "find_excess"
    lets_lern = "lets_lern"
    stop = "stop"
    start_play = "start_play"
    skills = "skills"
    tell_phraseology = "tell_phraseology"


skills = [
    {"title": "Найди лишнее",
     "description": "Интересная игра на перевод слов и выявление закономерностей",
     "image": None,
     "button": "Найди лишнее"},

    {"title": "Подсказать правило",
     "description": "Подскажу и объясню правило по татарскому языку",
     "image": None,
     "button": "расскажи правило"},

    {"title": "Учить слова",
     "description": "Ты сможешь прослушать произношение слов по категориям",
     "image": None,
     "button": "Учить слова"},

    {"title": "Интересный факт",
     "description": "Расскажу что нибудь интересное про татарский язык",
     "image": None,
     "button": "Интересный факт"},

    {"title": "Продолжи пословицу",
     "description": "Мини-игра для прокачки своего перевода и для поплнения пословиц в свой запас",
     "image": None,
     "button": "Продолжи пословицу"},
]
