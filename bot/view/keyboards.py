from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton

from view import buttons


def main_menu_kb(language: int):
    kb = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)

    kb.row(KeyboardButton(("✅ " if not language else "") + buttons.from_russian_to_tatar),
           KeyboardButton(("✅ " if language else "") + buttons.from_tatar_to_russian))
    return kb


back = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)
back.add(KeyboardButton(buttons.back))


def remember_check(word_id):
    kb = InlineKeyboardMarkup()
    kb.add(InlineKeyboardButton(buttons.remember, callback_data=f"remember_{word_id}"))
    return kb