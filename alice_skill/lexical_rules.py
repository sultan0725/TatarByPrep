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
            item(
                title="Лицо",
                description="Расскажу о склонении татарских слов в лицах",
                image_id="965417/44bcf1db546ac9ce9d62",
                img_button=button(title="Лица", payload={"rule": "face"})
            ),
            item(
                title="Падеж",
                description="Расскажу про сколонение татарских слов в разные падежи",
                image_id="937455/923a33aa22c61bba5509",
                img_button=button(title="Падеж", payload={"rule": "case"})
            )
        ]
        return make_response(text=texts.ALL_RULES_TEXT, card=items_list(content=items, header="Правила"))
    elif slot == "face":
        return make_response(text="Расскажу о склонении татарских слов в лицах")
    elif slot == "case":
        return make_response(text="Расскажу о склонении татарских слов в падежах")
    else:
        return fallback_response()
