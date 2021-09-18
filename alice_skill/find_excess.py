import alice_skill.view.texts as texts
import alice_skill.view.keyboards as keyboards
import alice_skill.view.tts as tts
from alice_skill.view.texts import *
from alice_skill.uttils import *
import alice_skill.data as data
from random import choice


def start_find_excess():
    return make_response(BEGIN_PLAY_FIND_EXCESS, state={"screen": "begin_find_excess"},
                         buttons=[button("Начинаем", hide=True)])


def continue_find_excess(event, payload):
    box = choice(data.excess)
    if payload.get("excess", None) == 1:
        head = "Все верно. Идем дальше"
    elif payload.get("excess", None) == 0:
        head = "Неверно, попробуй снова"
        for i in data.excess:
            if i["id"] == payload["id"]:
                box = i
                break
    else:
        head = "Выберите лишнее:"

    items = [item(description=i) for i in box["question"]]
    buttons = [button(title=i, hide=True, payload={"excess": 1 if box["answer"] == i else 0, "id": box["id"]}) for i in box["question"]]
    return make_response(text=texts.RULE_GAME, state={"screen": "begin_find_excess"},
                         card=items_list(content=items, header=head), buttons=buttons)
