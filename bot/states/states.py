from aiogram.dispatcher.filters.state import StatesGroup, State


class User(StatesGroup):
    REGISTRATION = State()
    MAIN_MENU = State()
    START_SEND_LOGIN = State()
    START_SEND_PASSWORD = State()
    SEND_TRASLATIONS = State()
    CHOOSE_CATEGORY = State()
    SEND_TRASLATIONS_IN_TEST = State()
    WAIT_FOR_ANSWER_FOR_TEST = State()
    TRANLATOR = State()
    TRANSLATE_SENTENSE = State()
    FIND_EXESS = State()
