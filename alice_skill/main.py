from alice_skill.uttils import *
import alice_skill.random_fact as random_fact
import alice_skill.find_excess as find_excess
import alice_skill.lexical_rules as lexical_rules
import alice_skill.complete_proverb as complete_proverb


def handler(event, context):
    intents = event["request"].get("nlu", {}).get('intents', [])
    if event["session"]['new']:
        return start()
    if IntentsNames.send_fact in intents:
        return random_fact.send_random_fact()
    else:
        return fallback_response()


def start():
    return make_response(texts.WELCOME)
