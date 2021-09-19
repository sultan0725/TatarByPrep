from random import choice

from aiogram import types

from database import crud, data
from loader import dp, bot
from states.states import User
from utils import switchers, service_api
from aiogram.dispatcher import FSMContext

from view import messages, keyboards, buttons


async def switch_to_complete_proverb(message: types.Message, state: FSMContext):
    await User.COMPLATE_PROVERB.set()
    await message.answer(messages.COMPLATE_PROVERB_RULES)
    await send_question(message, state)


async def send_question(message: types.Message, state: FSMContext, is_new=True):
    fsm_data = await state.get_data()
    if is_new:
        fsm_data["question"] = choice(list(data.proverb.keys()))
    await message.answer(messages.COMPLATE_PROVERB.format(start=data.proverb[fsm_data["question"]]["question"]),
                         reply_markup=keyboards.find_excess(data.proverb[fsm_data["question"]]["choice"]))
    await state.set_data(fsm_data)


@dp.message_handler(state=User.COMPLATE_PROVERB, content_types=['text'])
async def continue_find_excess(message: types.Message, state: FSMContext):
    if message.text == buttons.in_main_menu:
        await switchers.main_menu(message, state)
        return
    fsm_data = await state.get_data()
    if message.text == data.proverb[fsm_data["question"]]["answer"]:
        await message.answer(messages.CORRECT_WITH_MEANING.format(meaning=data.proverb[fsm_data["question"]]["meaning"]))
        await send_question(message, state)
    else:
        await message.answer(messages.INCORRECT)
        await send_question(message, state, False)
