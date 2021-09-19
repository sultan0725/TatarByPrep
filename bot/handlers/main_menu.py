from aiogram import types

from handlers.find_excess import switch_to_find_excess
from handlers.lern_sentenses import switch_to_sentences
from handlers.tranlator import switch_to_translator
from loader import dp
from states.states import User
from aiogram.dispatcher import FSMContext
from view import buttons, messages, keyboards
from utils import tatarby_api
from handlers.lern_words import switch_to_repeat


@dp.message_handler(state=User.MAIN_MENU, content_types=['text'])
async def main_menu(message: types.Message, state: FSMContext):
    if message.text == buttons.lern_words:
        await switch_to_repeat(message, state)
    elif message.text == buttons.translator:
        await switch_to_translator(message, state)
    elif message.text == buttons.lern_sentenses:
        await switch_to_sentences(message, state)
    elif message.text == buttons.find_excess:
        await switch_to_find_excess(message, state)
    else:
        await message.answer(messages.USE_ONLY_BUTTONS, reply_markup=keyboards.main_menu_kb)
