from random import choice

from aiogram import types

from database import crud, data
from loader import dp, bot
from states.states import User
from utils import switchers, service_api
from aiogram.dispatcher import FSMContext

from view import messages, keyboards, buttons


async def switch_to_find_excess(message: types.Message, state: FSMContext):
    await User.TRANSLATE_SENTENSE.set()
    await message.answer(messages.FIND_EXESS)
    await send_question(message, state)


async def send_question(message: types.Message, state: FSMContext, is_new=True):
    fsm_data = await state.get_data()
    if is_new:
        fsm_data["question"] = choice(list(data.excess.keys()))
    await message.answer(messages.FIND_EXESS_HEADER,
                         reply_markup=keyboards.find_excess(data.excess[fsm_data["question"]]["question"]))
    await state.set_data(fsm_data)
    await User.FIND_EXESS.set()


@dp.message_handler(state=User.FIND_EXESS, content_types=['text'])
async def continue_find_excess(message: types.Message, state: FSMContext):
    if message.text == buttons.in_main_menu:
        await switchers.main_menu(message, state)
        return
    fsm_data = await state.get_data()
    if message.text == data.excess[fsm_data["question"]]["answer"]:
        await message.answer(messages.CORRECT)
        await send_question(message, state)
    else:
        await message.answer(messages.INCORRECT)
        await send_question(message, state, False)
