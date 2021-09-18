import alice_skill.view.texts as texts
import alice_skill.view.keyboards as keyboards
import alice_skill.view.tts as tts
from alice_skill.view.texts import *
from alice_skill.uttils import *


def start_find_excess(event):
    return make_response(BEGIN_PLAY_FIND_EXCESS, state={"screen": "begin_find_excess"}, buttons=[button("Начинаем", hide=True)])