from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

from view import buttons


def main_menu_kb(language: int):
    kb = ReplyKeyboardMarkup(one_time_keyboard=False, resize_keyboard=True)

    kb.row(KeyboardButton(("✅ " if not language else "") + buttons.from_russian_to_tatar),
           KeyboardButton(("✅ " if language else "") + buttons.from_tatar_to_russian))
    return kb
