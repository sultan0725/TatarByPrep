import alice_skill.view.texts as texts
import alice_skill.view.keyboards as keyboards
import alice_skill.view.tts as tts
from alice_skill.config import IntentsNames
from alice_skill.uttils import *

def about_rules(event):
    intent = event["request"]["nlu"]["intents"][IntentsNames.tatar_rules]
    slot = intent["slots"]["rules"]["value"]

    if slot == "rule":
        items = [
            item(title="Лицо", description="Расскажу о склонении татарских слов в лицах"),
            item(title="Падеж", description="Расскажу про сколонение татарских слов в разные падежи")
        ]
        return make_response(text=texts.ALL_RULES_TEXT, card=items_list(content=items, header="Правила"))
    elif slot == "face":
        return make_response(text="Расскажу о склонении татарских слов в лицах")
    else:
        return fallback_response()