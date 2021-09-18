from alice_skill.uttils import *
import alice_skill.random_fact as random_fact
import alice_skill.find_excess as find_excess
import alice_skill.lexical_rules as lexical_rules
import alice_skill.complete_proverb as complete_proverb
import alice_skill.lern_words as lern_words


def handler(event, context):
    intents = event["request"].get("nlu", {}).get('intents', [])
    state = event.get('state').get(REQUEST_STATE, {})
    payload = event["request"].get('payload', {})
    if event["session"]['new']:
        return start()
    elif IntentsNames.send_fact in intents:
        return random_fact.send_random_fact()

    elif IntentsNames.lets_lern in intents:
        return lern_words.chose_category()

    elif IntentsNames.tatar_rules in intents:
        return lexical_rules.about_rules(event)

    elif payload.get("category_button", False):
        return lern_words.learn_words_by_num(payload["category_button"], 0)

    elif state.get('active_skill', None):
        pass
    else:
        return fallback_response()


def start():
    return make_response(texts.WELCOME)
