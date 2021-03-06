from random import shuffle

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from utils import service_api
from view import buttons


def language_kb(language: int):
    kb = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)

    kb.row(KeyboardButton(("✅ " if not language else "") + buttons.from_russian_to_tatar),
           KeyboardButton(("✅ " if language else "") + buttons.from_tatar_to_russian))
    kb.add(KeyboardButton(buttons.back))
    return kb


main_menu_kb = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)
main_menu_kb.add(KeyboardButton(buttons.translator))
main_menu_kb.row(KeyboardButton(buttons.lern_words), KeyboardButton(buttons.lern_sentenses))
main_menu_kb.row(KeyboardButton(buttons.find_excess), KeyboardButton(buttons.complete_proverb))

back = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)
back.add(KeyboardButton(buttons.back))

lern_keyboard = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)
lern_keyboard.add(KeyboardButton(buttons.skip))
lern_keyboard.add(KeyboardButton(buttons.break_lern))


def remember_check(word_id):
    kb = InlineKeyboardMarkup()
    kb.add(InlineKeyboardButton(buttons.remember, callback_data=f"remember_{word_id}"))
    return kb


def all_categories():
    all_categories = list(map(lambda x: [x["word_original"], x["word_rus"], x["id"]], service_api.get_all_categories()))
    kb = InlineKeyboardMarkup()
    for category in all_categories:
        kb.add(InlineKeyboardButton(f"{category[0]}({category[1]})", callback_data=f"lern_{category[2]}"))
    return kb


def find_excess(words):
    shuffle(words)
    kb = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True, row_width=2)
    for word in words:
        kb.insert(KeyboardButton(word))
    kb.add(buttons.in_main_menu)
    return kb
