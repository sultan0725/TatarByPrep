from uttils import *
import random_fact
import find_excess
import lexical_rules
import complete_proverb


def handler(event):
    intents = event["request"].get("nlu", {}).get('intents', [])
    if "some_intent" in intents:
        pass
    else:
        return fallback_response()
