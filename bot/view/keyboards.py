from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

from view import buttons


def main_menu_kb(language: int):
    kb = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)

    kb.add(
        KeyboardButton(
            buttons.from_russian_to_tatar if language == 0 else buttons.from_tatar_to_russian))

    return kb
