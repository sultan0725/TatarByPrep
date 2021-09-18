from alice_skill.uttils import *
import alice_skill.random_fact as random_fact
import alice_skill.find_excess as find_excess
import alice_skill.lexical_rules as lexical_rules
import alice_skill.complete_proverb as complete_proverb


def handler(event, context):
    intents = event["request"].get("nlu", {}).get('intents', [])
    if event["session"]['new']:
        return start()
    elif IntentsNames.gallery in intents:
        return make_response(text="СҮЗГӘ ЛЕКСИК АНАЛИЗ ЯСАУ ТӘРТИБЕ",
                             card=image_gallery([image("1521359/954de487aa6576addbbb", title="Арбуз 1"),
                                                 image("937455/5ab6257ed791cf3e8d41", title="Арбуз 2"),
                                                 image("997614/f9e5d142dae10f6c3926", title="Арбуз 3")]))
    elif IntentsNames.items_list in intents:
        return make_response(
            text="СҮЗГӘ ЛЕКСИК АНАЛИЗ ЯСАУ ТӘРТИБЕ",
            card=items_list([image("1521359/954de487aa6576addbbb", title="Арбуз 1", description="Описание 1"),
                             image("937455/5ab6257ed791cf3e8d41", title="Арбуз 2", description="Описание 1"),
                             image("997614/f9e5d142dae10f6c3926", title="Арбуз 3", description="Описание 1")],
                            header="Заголовок",
                            footer="подпись снизу")
        )
    elif IntentsNames.big_image in intents:
        return make_response(
            text="СҮЗГӘ ЛЕКСИК АНАЛИЗ ЯСАУ ТӘРТИБЕ",
            card=big_image(image("1521359/954de487aa6576addbbb", title="Арбуз 1", description="Описание 1")))
    else:
        return fallback_response()


def start():
    return make_response(texts.WELCOME)
