from aiogram.dispatcher.filters.state import StatesGroup, State


class User(StatesGroup):
    REGISTRATION = State()
    MAIN_MENU = State()
    START_SEND_LOGIN = State()
    START_SEND_PASSWORD = State()
